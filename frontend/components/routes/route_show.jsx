import React from 'react'
import MapOnly from './map_only'

class RouteShow extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.requestRoute(this.props.match.params.routeId)
    }
    

    render(){
        const {route}=this.props

    //need to call route map render functions here after everything has rendered, create a separate component, much easier
        if (!route) return null;
        return(
            <div className='route-show'>
               {route.title}
               <br/>
                {route.miles} miles
                <br/>
                <MapOnly route={route}/>
                
            </div>
        )
    }

}

export default RouteShow;