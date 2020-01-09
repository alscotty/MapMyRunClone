import React from 'react'
import { logoutCurrentUser } from '../../actions/session_actions';

class RouteIndexItem extends React.Component{
    constructor(props){
        super(props);
    }



    render(){
        const {route,currentUser,deleteRoute}=this.props
        console.log(route.id)
        return(
            <div>
                <h3>{route.title}</h3>
                {currentUser.id == route.user_id ? (
                    <button onClick={()=>{deleteRoute(route.id)}}>Delete Route</button>
                ) : ('')}
            
            </div>
            )
    }
}

export default RouteIndexItem;