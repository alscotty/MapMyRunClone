import React from 'react'
import {Link} from 'react-router-dom'
import {formatDateTime} from '../../util/date_util'

class WorkoutIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            body:''
        }

        this.renderIndMap = this.renderIndMap.bind(this)
        this.readyMap = this.readyMap.bind(this)
        this.handleComment=this.handleComment.bind(this)
        this.handleDeleteComment=this.handleDeleteComment.bind(this)
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
            .then(this.props.requestWorkout(workout.id))
            .catch(this.props.requestWorkout(workout.id))
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
            .then(this.props.requestWorkout(workout.id))
            .catch(this.props.requestWorkout(workout.id))
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
                {workout.title}
                <br/>
                by: {workout.creator}
                {workout.description.length ? 
                <span>
                <br/>
                    Description:{workout.description}
                </span>
                : ''}
                <br/>

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
                    <br/>
                        <span id='date'>{formatDateTime(workout.created_at)}</span>
                    <br />

                {workout.time !=0 && workout.miles ? (
                    <span>
                    <br/>
                    Time:{workout.time} min.
                    </span>
                    )
                    : ''}
                    <br/>
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