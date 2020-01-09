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
        const {routes,currentUser}=this.props
        
        return(
            <div>
            <h2>Welcome to Routes Index!</h2>
            {routes.map(route=>{
                return(
                    <RouteIndexItem key={route.id} route={route} deleteRoute={this.props.deleteRoute}/>
                )
            })}
            </div>
        )
    }

}

export default RoutesIndex;