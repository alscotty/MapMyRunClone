import React from 'react'
import {Link} from 'react-router-dom'
import {formatDateTime} from '../../util/date_util'

class WorkoutIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            body:'',
        }

        this.renderIndMap = this.renderIndMap.bind(this)
        this.readyMap = this.readyMap.bind(this)
        this.handleComment=this.handleComment.bind(this)
        this.handleDeleteComment=this.handleDeleteComment.bind(this)
        this.likeHandler=this.likeHandler.bind(this);
        this.handleCreateLike=this.handleCreateLike.bind(this);
    }

    handleCreateLike(user,workout){
        const {createLike} = this.props;
        let like={
            user_id:user.id,
            creator_name: user.username,
            workout_id: workout.id
        }
        createLike(like)
            .then(()=>this.props.requestWorkout(workout.id))
    }

    likeHandler(){
        const {workout,currentUser} = this.props
        let likeUserIds = []
        let myLike
        let likeCount= workout.likes.length
        workout.likes.map(like=> {
            likeUserIds.push(like.user_id)
            if(like.user_id == currentUser.id) myLike=like;
        });
       
        if(myLike){
            return(
                <div className='like-div'>
                    <img className='like-images' src={window.likedURL} alt="liked" onClick={(e)=>{
                        e.preventDefault()
                        this.props.deleteLike(myLike)
                            .then(()=>this.props.requestWorkout(workout.id))
                    }}/>
                    <span id='like-text'>{likeCount > 1 ? `You and ${likeCount - 1} others like this` : ''}</span>
                </div>
            )
        } else {
            return (
                <div className='like-div'>
                    <img className='like-images' src={window.unlikedURL} alt='unliked' onClick={(e)=>{
                        e.preventDefault();
                        this.handleCreateLike(currentUser,workout)}}/>
                        <span id='like-text'>{likeCount>0 ? ` ${likeCount} kudos`:" Be the first to give kudos"}</span>
                </div>
            )
        }

    }


    update(field){
        return(
            e=>{
                this.setState({ [field]: e.target.value })
            }
        )
    }

    handleDeleteComment(workout,comment){
        this.props.deleteComment(comment)
            .then(()=>this.props.requestWorkout(workout.id))
    }

    handleComment(e){
        e.preventDefault();
        const {workout, currentUser}=this.props;

        let comment={
            body:this.state.body,
            workout_id: workout.id,
            creator: currentUser.username,
            creator_id: currentUser.id

        }
        this.props.createComment(comment)
            .then(this.setState({body:''}))
            .then(()=>this.props.requestWorkout(workout.id))
    }

    renderIndMap(coordinates) {
        let ren = new google.maps.DirectionsRenderer();
        let dir = new google.maps.DirectionsService();

        let map = new google.maps.Map(document.getElementById(`workout-map-${this.props.workout.id}`), {
            center: { lat: 37.773972, lng: -122.431297 },
            zoom: 13,
            maxZoom: 15,
            disableDefaultUI: true,
            gestureHandling: 'none'
        });
        ren.setMap(map);

        let waypts = []
        for (let i = 0; i < coordinates.length; i++) {
            waypts.push({
                location: coordinates[i],
                stopover: false
            });
        }
        dir.route({
            origin: coordinates[0],
            destination: coordinates[coordinates.length - 1],
            waypoints: waypts,
            optimizeWaypoints: false,
            travelMode: 'WALKING'
        }, (response, status) => {
            if (status === 'OK') {
                ren.setDirections(response);

            } else {
                window.alert('Directions request failed due to' + status)
            }
        });
    }


    readyMap(route) {

        let formatted_coords = [];
        if (route.route.coordinates) {
            route.route.coordinates.map(coord => {
                formatted_coords.push({ lat: coord['lat'], lng: coord['lng'] })
            });
            this.renderIndMap(formatted_coords)
        }
    }


    componentDidMount(){
        this.props.requestWorkout(this.props.workout.id)
            .then(()=>{
                if(this.props.workout.route_id){
                    this.props.requestRoute(this.props.workout.route_id)
                    .then(route=>this.readyMap(route))

                }
            });
            const {currentUser, workout} = this.props;
            if(currentUser.id===workout.user_id){
                let totalMiles = document.getElementById("total-miles")
                let num=parseFloat(totalMiles.innerHTML)
                workout.route ? (num+=workout.route.miles) : (num+=workout.miles)
                totalMiles.innerHTML = num.toFixed(2) + ' miles';
            }
    }

    deduct(workout){
        let totalMiles = document.getElementById("total-miles")
        let num = parseFloat(totalMiles.innerHTML)
        workout.route ? (num -= workout.route.miles) : (num -= workout.miles)
        totalMiles.innerHTML = num.toFixed(2) + ' miles';
    }

    render(){
        const {workout,deleteWorkout, currentUser}=this.props;

        return(
            <div id='workout-and-comments'>
            <div id='workout-index-item'>
                <span className='workout-info'>
                    <span id='row'>
                <span id='blue-text'>{`${workout.title}  `}</span>
                by: <span id='blue-text'>{`  ${workout.creator}`}</span>
                    </span>
                {workout.description.length ? 
                <span>
                    Description:{workout.description}
                </span>
                : ''}

                {workout.route_id && workout.route ? (
                    <span>
                        <br/>
                        <span className='linky'>{workout.creator}</span> ran 
                        <Link to={`/routes/${workout.route.id}`} className='linky'>
                        {` ${workout.route.title}`}
                        </Link>
                        <br/>
                    </span>
                ) : ''}
                        <span id='date'>{formatDateTime(workout.created_at)}</span>

                {workout.time !=0 && workout.miles ? (
                    <span>
                    {workout.time} min.
                    </span>
                    )
                    : ''}
                    {workout.route ? (
                    (<span>
                        {`${workout.route.miles} miles`}
                    </span>)
                    ): 
                    (<span>
                        {`${workout.miles} miles`}
                    </span>)
                }
                <br/>
                {currentUser.id === workout.user_id ? 
                <button id='delete-workout-button' onClick={()=>{deleteWorkout(workout.id).then(this.deduct(workout))}}>Delete Workout</button>
                : ""    
            }
                </span>

                <span id='mapp'>
                {workout.route ? 
                    <div className='workout-map' id={`workout-map-${this.props.workout.id}`}></div>
            : <img src={window.workoutURL}/>}
                </span>
            
            </div>

                <span id='comments'>
                   {this.likeHandler()}

                {workout.comments ? workout.comments.map(comment=>{
                    return(<div key={comment.id}>
                        <span id='space-between'>
                        <span id='blue-text'>{comment.creator}</span>
                        {comment.creator_id===currentUser.id || workout.user_id === currentUser.id ? 
                        <span className='linky' onClick={()=>this.handleDeleteComment(workout,comment)}>Delete </span>
                        :""}

                        </span>
                        {comment.body} 
                        <br/>
                        <br/>
                    </div>)
                }) : ""}

                    <form id='comment-form' onSubmit={this.handleComment}>
                        <textarea id='comment-text'
                            cols="30"
                            rows="1"
                            placeholder='Write a comment..'
                            value={this.state.body}
                            onChange={this.update("body")}
                        />
                        <input id='post-button' className='linky' type="submit" value="POST"></input>

                    </form>

                </span>
            </div>
        )
    }

}

export default WorkoutIndexItem;