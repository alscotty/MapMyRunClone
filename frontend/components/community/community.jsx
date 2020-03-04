import React, { Component } from 'react'

class Community extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.requestUsers();
    }

    render() {
        const {allUsers}=this.props
        if(!allUsers)return null;

        return (
            <div className='community-page'>
                Other users go here..
              {allUsers.map(user=>{
                  return(
                      <div>
                          {user.username}
                          <br/>
                      </div>
                  )
              })}
            </div>
        )
    }
}


export default Community;