import React, { Component } from 'react'

class Community extends Component {
    constructor(props){
        super(props);
        this.state={
            currentfollows: this.props.currentUser.followees
        }

        this.handleFollow=this.handleFollow.bind(this);
    }

    componentDidMount(){
        this.props.requestUsers();
    }

    handleFollow(userId){
        const {createFollow, deleteFollow, currentUser} = this.props;
        if (userId in currentUser.out_follows){
            //unfollow logic:
            deleteFollow(userId);
        } else {
            //follow logic:
            createFollow(userId)
        }
    }

    render() {
        const {currentUser, allUsers}=this.props
        if(!allUsers)return null;

        let followeeIds=[];
        currentUser.followees.map(followee=>{
            followeeIds.push(followee.id)
        })

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
                          {user.id in followeeIds ? "Unfollow" : "Follow"}
                          </button>
                            <br/>
                        </div>
                    : ""
                  )
              })
            }

              <br/>
              Your are following: {currentUser.followees.map(followee=>{
                  return followee.username
              })}
              {followeeIds}

            </div>
        )
    }
}


export default Community;