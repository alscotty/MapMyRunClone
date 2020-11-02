import React from 'react'
import {withRouter} from 'react-router-dom'

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
            directionsRenderer:'',
            noCoords:"",
            userDirections:"Click on the map to start creating a route"
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.renderMap=this.renderMap.bind(this);
        this.makeMap=this.makeMap.bind(this);
        this.addLatLng=this.addLatLng.bind(this);
        // this.snapPoint=this.snapPoint.bind(this);
        this.processSnappedPosData=this.processSnappedPosData.bind(this)
        this.calcAndDisplayRoute=this.calcAndDisplayRoute.bind(this);
    }

    clearCoords(){
        this.setState({noCoords:''})
    }

    handleSubmit(e) {
        e.preventDefault();
        const {coordinates}=this.state;
        if(coordinates.length){
        this.props.action(this.state.routeInfo,coordinates)
          .then(()=>{
              this.props.history.push('/routes')
            });
        } else{
            this.setState({noCoords: 'Coordinates required'})
        }
    }

    updateTitle() {
        return (
            e => {
                let routeInfo={...this.state.routeInfo};
                routeInfo.title= e.target.value;
                this.setState({routeInfo})
            }
        )
    };

    
    processSnappedPosData(lat,lng){
        // let snappedLat=data.snappedPoints[0].location.latitude; 
        // let snappedLng=data.snappedPoints[0].location.longitude;
        this.state.coordinates.push({ lat: lat, lng: lng})

        new google.maps.Marker({
            position: {lat:lat,lng:lng},
            map: this.state.map
        });
        this.calcAndDisplayRoute()
    }

    
    // snapPoint(lat,lng){
    //     let posArr=[lat,lng]
    //     $.get('https://roads.googleapis.com/v1/snapToRoads', {
    //         interpolate: true,
    //         key: window.googleAPIKey,
    //         path: posArr.join(",")
    //     },(data)=>{
    //         this.processSnappedPosData(data)
    //     });
    // }

    addLatLng(e) {
        let newLat = e.latLng['lat']()
        let newLng = e.latLng['lng']()
        // this.snapPoint(newLat,newLng)
        this.processSnappedPosData(newLat, newLng)
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
            } else {
                window.alert('Directions request failed due to' + status)
            } 
        });
    


    }

    makeMap(){
        this.state.directionsService= new google.maps.DirectionsService();
        this.state.directionsRenderer= new google.maps.DirectionsRenderer();
        this.state.map=new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            maxZoom:15,
            disableDefaultUI: true,
        });

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition((position) => {
            // Center on user's current location if geolocation prompt allowed
            var initialLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
            map.setZoom(13);
        }, () => {
            map.setCenter({ lat: 37.773972, lng: -122.431297 })
        }, options)

        
        const {directionsRenderer,map}=this.state;
        directionsRenderer.setMap(map);
        map.addListener('click', (e)=>{
            this.addLatLng(e)
            this.clearCoords()
            this.setState({userDirections:""})
        });

        let searchBar = document.getElementById("search");
        let searchBox = new window.google.maps.places.SearchBox(searchBar)

        new window.google.maps.event.addListener(searchBox, 'places_changed', () => {
            let places = searchBox.getPlaces();
            map.setCenter(places[0].geometry.location)
        });
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBar)
    };

    componentDidMount(){
        this.props.clearRouteErrors();
        this.makeMap();
    };   

    renderMap(){ 
        return(
                <div id="map"></div>

        )
    }


    renderErrors() {
        const { errors } = this.props;
        return (
            <ul className='login-errors'>
                {this.state.noCoords}
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
                <input id='search' type='text' placeholder='Search other locations' />
                <form className='route-form' onSubmit=  {this.handleSubmit}>
                    <summary>
                    Route Details
                    </summary>
                    <br/>
                        <input type="text"
                        className='route-title-input'
                        placeholder='Name this map'
                        value={this.state.routeInfo.title}
                        onChange={this.updateTitle()}
                        />
                    <br/>
                    <label>Distance: {this.state.routeInfo.miles} MI</label>
                <br/>
                    <input id='route-button' type="submit" value='Save Route'/>
            <br/>
                <span id='instructions'>{this.state.userDirections}</span>
                {this.renderErrors()}
            </form>
                {this.renderMap()}
            </div>
        )
    }
}

export default withRouter(RoutesForm);
