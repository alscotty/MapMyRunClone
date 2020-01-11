import React from 'react'

class RouteIndexItem extends React.Component{
    constructor(props){
        super(props);
    }


    

    render(){
        const {route,currentUser,deleteRoute,allUsers}=this.props
        return(
            <div key={route.id}>
                <h3>{route.title}</h3>
                <h3>Distance {route.miles}mi</h3>
                Coordinates:
                <br/>
                {route.coordinates ? route.coordinates.map(coord=>{
                    return (
                        <div key={coord.id}>
                        Lat: {coord.lat},
                        Lng: {coord.lng},
                        Route_id: {coord.route_id},
                        Ord: {coord.ord}
                        </div>
                    )
                }) :''}

                {currentUser.id == route.user_id ? (
                    <button onClick={()=>{deleteRoute(route.id)}}>Delete Route</button>
                ) : ('')}
            </div>
            )
    }
}

export default RouteIndexItem;



//display who created the route, works but inefficient,should be a better way:
{/* <h5>{allUsers.map(user => {
    if (user.id == route.user_id) {
        return (<div>
            Created by: {user.username}
        </div>
        )
    }
})}</h5> */}