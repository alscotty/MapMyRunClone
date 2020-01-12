import React from 'react'

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
            maxZoom: 15
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
            travelMode: 'DRIVING'
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
        // this.props.requestRoute(this.props.route.id);
        this.readyMap();
    }

    mapSetup() {
        return (
            <div>
                <div id={`index-map-${this.props.route.id}`} className='index-map'></div>
                <script  src={`https://maps.googleapis.com/maps/api/js?key=${window.googleAPIKey}&callback=initMap`}
                    async defer></script>

            </div>
        )
    }
    

    render(){
        const {route,currentUser,deleteRoute,allUsers}=this.props
        return(
            <div key={route.id}>
                <h3>{route.title}</h3>
                <h3>{allUsers.map(user => {
                        if (user.id == route.user_id) {
                            return (<div key={route.id}>
                                Created by: {user.username}
                            </div>
                            )
                        }})}</h3>
                <h3>Distance {route.miles}mi</h3>
                Coordinates:
                <br/>
                {route.coordinates ? this.mapSetup() : ''}
                
                <br/>
                
                {currentUser.id == route.user_id ? (
                    <button onClick={()=>{deleteRoute(route.id)}}>Delete Route</button>
                ) : ('')}
            </div>
            )
    }
}

export default RouteIndexItem;



//display who created the route, works but inefficient,should be a better way:
//better to have id as top level key for user in state?
{/* <h5>{allUsers.map(user => {
    if (user.id == route.user_id) {
        return (<div>
            Created by: {user.username}
        </div>
        )
    }
})}</h5> */}


// {
//     route.coordinates ? route.coordinates.map(coord => {
//         return (
//             <div key={coord.id}>
//                 Lat: {coord.lat},
//                         Lng: {coord.lng},
//                         Route_id: {coord.route_id},
//                         Ord: {coord.ord}
//             </div>
//         )
//     }) : ''
// }