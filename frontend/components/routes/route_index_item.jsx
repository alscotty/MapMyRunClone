import React from 'react'
import {Link} from 'react-router-dom';

class RouteIndexItem extends React.Component{
    constructor(props){
        super(props);

        this.renderIndMap=this.renderIndMap.bind(this)
        this.mapSetup=this.mapSetup.bind(this)
        this.readyMap=this.readyMap.bind(this)
    }


    renderIndMap(coordinates){
        let ren= new google.maps.DirectionsRenderer();
        let dir= new google.maps.DirectionsService();

        let map= new google.maps.Map(document.getElementById(`index-map-${this.props.route.id}`), {
            center: { lat: 37.773972, lng: -122.431297 },
            zoom: 13,
            maxZoom: 15,
            disableDefaultUI: true,
            gestureHandling:'none'
        });
        ren.setMap(map);

        let waypts = []
        for (let i = 0; i < coordinates.length; i++) {
            waypts.push({
                location: coordinates[i],
                stopover: false
            });
        }
        dir.route({
            origin: coordinates[0],
            destination: coordinates[coordinates.length - 1],
            waypoints: waypts,
            optimizeWaypoints: false,
            travelMode: 'WALKING'
        }, (response, status) => {
            if (status === 'OK') {
                ren.setDirections(response);

            } else {
                window.alert('Directions request failed due to' + status)
            }
        });
    }

    readyMap() {
        let formatted_coords = [];
        if(this.props.route.coordinates){
        this.props.route.coordinates.map(coord => {
            formatted_coords.push({ lat: coord['lat'], lng: coord['lng'] })
        });
        this.renderIndMap(formatted_coords)}
    }

    componentDidMount() {
        this.props.requestRoute(this.props.route.id)
        .then(()=>{this.readyMap()});
    }

    mapSetup() {
        return (
            <div>
                <div id={`index-map-${this.props.route.id}`} className='index-map'></div>

            </div>
        )
    }
    
    render(){
        const {route,currentUser,deleteRoute}=this.props


        return(
            <div key={route.id} className='route-index-item'>
                <span id='route-info'>
                    <span className='linky' >
                    {`${currentUser.username} `}
                    </span>                   created the route
                    <Link className='linky' to={`/routes/${route.id}`}>
                        {` ${route.title}`}
                    </Link>
                {route.coordinates ? this.mapSetup() : ''}
                <Link className='delete-button' to={`/routes/${route.id}/workout`}>Save as Workout</Link>              
                <button className='delete-button' onClick={() => { deleteRoute(route.id) }}>Delete Route</button>
                </span>

                <div className='mini-flex'>
                    <div id='distance-only'>
                        <span id='dist'>
                        Distance 
                        </span>
                        <br/>
                        <span id='num'>{route.miles}</span>
                         mi</div>
                    <br/>
                </div>
                <br/>
            </div>
            )
    }
}

export default RouteIndexItem;