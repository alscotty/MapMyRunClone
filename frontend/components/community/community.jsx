import React, { Component } from 'react'

class Community extends Component {
    constructor(props){
        super(props);

        this.handleFollow=this.handleFollow.bind(this);
    }

    componentDidMount(){
        this.props.requestUsers();
    }

    handleFollow(userId){
        const {createFollow, deleteFollow, followeeIds, requestUsers} = this.props;

        if (followeeIds.includes(userId)){
            //unfollow logic:
            deleteFollow(userId);
        } else {
            //follow logic:
            createFollow(userId)
        }
        requestUsers();
    }

    render() {
        const {currentUser, allUsers,followeeIds}=this.props
        if(!allUsers)return null;

        return (
            <div className='community-page'>
                Other users go here..
              {allUsers.map(user=>{
                  return(
                      currentUser.id !== user.id ?
                        <div key={user.id}>
                            {user.username}
                            <br/>
                          <button onClick={() => this.handleFollow(user.id)}>
                            {followeeIds.includes(user.id) ? "Unfollow" : "Follow"}
                          </button>
                            <br/>
                        </div>
                    : ""
                  )
              })
            }

              <br/>
             {followeeIds}

            </div>
        )
    }
}


export default Community;