import React from 'react'
import RouteIndexItem from './route_index_item'

class RoutesIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.requestRoutes()
    }



    // dateSorter(a,b){
    //     let comparison=0

    //     if(a.updated_at>b.updated_at){
    //         comparison=1
    //     } else{
    //         comparison=-1
    //     }

    //     return comparison;
    // }
    // .sort(this.dateSorter)
   

    render(){
        const {routes,currentUser,allUsers,requestRoute}=this.props

        return(  
            <div className='route-index'>
         
            <h2 id='act-feed'>Activity Feed</h2>

                {routes.reverse().map(route=>{
                return(
                    <RouteIndexItem key={route.id*2} route={route} deleteRoute={this.props.deleteRoute} currentUser={currentUser} allUsers={allUsers} requestRoute={requestRoute}/>
                )
            })}
            </div>
        )
    }

}

export default RoutesIndex;