import React from 'react'


class RoutesIndex extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {currentUser}=this.props
        return(
            <div>
            <h2>Welcome to Routes Index!</h2>
            {currentUser.routes ? currentUser.routes.map(route=>{
                return(
                    route.title
                )
            }): ''}
            </div>
        )
    }

}

export default RoutesIndex;