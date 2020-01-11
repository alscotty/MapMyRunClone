import React from 'react'

class RoutesForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            routeInfo:{
                title: this.props.title,
                user_id: this.props.currentUser.id,
            },
            coordinates:[],
            map:'',
            poly:'',
            path:[],
            directionsService:'',
            directionsRenderer:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.renderMap=this.renderMap.bind(this);
        this.makeMap=this.makeMap.bind(this);
        this.addLatLng=this.addLatLng.bind(this);
        this.snapPoint=this.snapPoint.bind(this);
        this.processSnappedPosData=this.processSnappedPosData.bind(this)
        this.calcAndDisplayRoute=this.calcAndDisplayRoute.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault;
        
        this.props.action(this.state.routeInfo,this.state.coordinates)
          .then(()=>{this.props.history.push('./routes')});

    }

    updateTitle() {
        return (
            e => {
                //sets up dummy object, used to assign nested state!
                let routeInfo={...this.state.routeInfo};
                routeInfo.title= e.target.value;
                this.setState({routeInfo})
            }
        )
    };

    
    processSnappedPosData(data){
        let snappedLat=data.snappedPoints[0].location.latitude; 
        let snappedLng=data.snappedPoints[0].location.longitude;
        this.state.coordinates.push({ lat: snappedLat, lng: snappedLng})
        // this.state.path.push({lat:snappedLat,lng:snappedLng})

        new google.maps.Marker({
            position: {lat:snappedLat,lng:snappedLng},
            map: this.state.map
        });
        this.calcAndDisplayRoute()
    }

    // componentDidUpdate(){
    //     this.calcAndDisplayRoute(this.directionsService,this.directionsRenderer)


    //     directionsRenderer.setMap(this.state.map);

    // }

    
    snapPoint(lat,lng){
        let posArr=[lat,lng]
        $.get('https://roads.googleapis.com/v1/snapToRoads', {
            interpolate: true,
            key: window.googleAPIKey,
            path: posArr.join(",")
        },(data)=>{
            this.processSnappedPosData(data)
        });
    }

    addLatLng(e) {
        // const {poly}=this.state;
        // this.setState({path: poly.getPath() })
        //push in formatted coordinates into state as they are added:
        let newLat = e.latLng['lat']()
        let newLng = e.latLng['lng']()
        this.snapPoint(newLat,newLng)
    }


    calcAndDisplayRoute(){
        let waypts=[]
        for(let i=0; i<this.state.coordinates.length; i++){
            waypts.push({
                location: this.state.coordinates[i],
                stopover:false
            });
        }
        
        const {coordinates,directionsService,directionsRenderer}=this.state;
        directionsService.route({
            origin: coordinates[0],
            destination: coordinates[coordinates.length-1],
            waypoints:waypts,
            optimizeWaypoints: false,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if(status === 'OK'){
                directionsRenderer.setDirections(response);
                // let route=response.routes[0]
            } else {
                window.alert('Directions request failed due to' + status)
            } 
        });
    


    }

    makeMap(){
        this.state.directionsService= new google.maps.DirectionsService();
        this.state.directionsRenderer= new google.maps.DirectionsRenderer();
        this.state.map=new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.773972, lng: -122.431297 },
            zoom: 13
        });
        
        const {directionsRenderer,map}=this.state;
        directionsRenderer.setMap(map);
        map.addListener('click', (e)=>{
            this.addLatLng(e)
            // this.calcAndDisplayRoute(this.directionsService,this.directionsRenderer)
        })
    };

    componentDidMount(){
          this.makeMap();
    };   

    renderMap(){ 
        return(
            <div>
                <div id="map"></div>
                    <script src={`https://maps.googleapis.com/maps/api/js?key=${window.googleAPIKey}&callback=initMap`}
                        async defer></script>

            </div>
        )
    }


    render(){
        return(
            <div>
            <h1>Create New Route</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Title
                    <br/>
                <input type="text"
                        value={this.state.routeInfo.title}
                        onChange={this.updateTitle()}
                />
                </label>
                <br/>

            {this.renderMap()}

            <br/>
            <input type="submit" value='Create Route'/>
            </form>
            </div>
        )
    }
}

export default RoutesForm;