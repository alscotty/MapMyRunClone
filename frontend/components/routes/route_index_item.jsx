import React from 'react'

class RouteIndexItem extends React.Component{
    constructor(props){
        super(props);
    }

    

    render(){
        const {route,deleteRoute}=this.props
        console.log(route.id)
        return(
            <div>
                <h3>{route.title}</h3>
                <button onClick={()=>{deleteRoute(route.id)}}>Delete Route</button>
            </div>
            )
    }
}

export default RouteIndexItem;