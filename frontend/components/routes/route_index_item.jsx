import React from 'react'
import { logoutCurrentUser } from '../../actions/session_actions';

class RouteIndexItem extends React.Component{
    constructor(props){
        super(props);
    }



    render(){
        const {route,currentUser,deleteRoute}=this.props
        return(
            <div key={route.id}>
                <h3>{route.title}</h3>
                {currentUser.id == route.user_id ? (
                    <button onClick={()=>{deleteRoute(route.id)}}>Delete Route</button>
                ) : ('')}
            
            </div>
            )
    }
}

export default RouteIndexItem;