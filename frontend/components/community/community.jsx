import React, { Component } from 'react'

class Community extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getUsers();
    }

    render() {
        const {allUsers}=this.props
        if(!allUsers)return null;


        return (
            <div className='community-page'>
                Other users go here..
              
            </div>
        )
    }
}


export default Community;