import React from 'react'
import RouteIndexItem from './route_index_item'

class RoutesIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.requestRoutes()
    }

    render(){
        const {routes,currentUser,allUsers,requestRoute}=this.props
        
        return(
            <div className='route-index'>
            <h2>Activity Feed</h2>
            {routes.map(route=>{
                return(
                    <RouteIndexItem key={route.id*2} route={route} deleteRoute={this.props.deleteRoute} currentUser={currentUser} allUsers={allUsers} requestRoute={requestRoute}/>
                )
            })}
            </div>
        )
    }

}

export default RoutesIndex;