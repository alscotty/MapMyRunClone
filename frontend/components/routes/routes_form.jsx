import React from 'react'

class RoutesForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            routeInfo:{
                title: this.props.title,
                user_id: this.props.currentUser.id,
                miles:0,
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
          .then(()=>{
              this.props.history.push('/routes')
            });

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

        new google.maps.Marker({
            position: {lat:snappedLat,lng:snappedLng},
            map: this.state.map
        });
        this.calcAndDisplayRoute()
    }

    
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
            travelMode: 'WALKING'
        }, (response, status)=> {
            if(status === 'OK'){
                directionsRenderer.setDirections(response);
                //calc miles
                var route=response.routes;
                let dist=route[0].legs[0].distance.value;
                let routeInfo = { ...this.state.routeInfo };
                routeInfo.miles = (dist * 0.00062137).toFixed(2);
                this.setState({ routeInfo })
                console.log(this.state.routeInfo.miles)

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
            zoom: 13,
            maxZoom:15
        });
        
        const {directionsRenderer,map}=this.state;
        directionsRenderer.setMap(map);
        map.addListener('click', (e)=>{
            this.addLatLng(e)
        })
    };

    componentDidMount(){
        this.props.clearRouteErrors();
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

    renderErrors(){
        const {errors}=this.props;
        return (
            <ul className='login-errors'>
                {errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render(){
        return(
            <div>
                <form className='route-form' onSubmit=  {this.handleSubmit}>
                    <summary>
                    Route Details
                    </summary>
                    <br/>
                        <input type="text"
                        id='route-title-input'
                        placeholder='Name this map'
                        value={this.state.routeInfo.title}
                        onChange={this.updateTitle()}
                        />
                    <br/>
                    <label>Distance: {this.state.routeInfo.miles} MI</label>
                <br/>
                    <input id='route-button' type="submit" value='Save Route'/>
            <br/>
                {this.renderErrors()}
            </form>
                {this.renderMap()}
            </div>
        )
    }
}

export default RoutesForm;
