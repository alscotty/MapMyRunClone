import React from 'react'
import {Link} from 'react-router-dom'
import {formatDateTime} from '../../util/date_util'

class WorkoutIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            body:'',
            formattedCoords: [],
        }

        this.renderIndMap = this.renderIndMap.bind(this)
        this.readyMap = this.readyMap.bind(this)
        this.handleComment=this.handleComment.bind(this)
        this.handleDeleteComment=this.handleDeleteComment.bind(this)
        this.likeHandler=this.likeHandler.bind(this);
        this.handleCreateLike=this.handleCreateLike.bind(this);
        this.convertCoordinatesToGPXString=this.convertCoordinatesToGPXString.bind(this);
        this.downloadGPXFile = this.downloadGPXFile.bind(this);
    }

    convertCoordinatesToGPXString (coordinatesArray, runName, runTime) {
        let currentTime = new Date();
        let timeSplit = runTime / coordinatesArray.length;

        let xmlString =`<?xml version="1.0" encoding="UTF-8"?>
<gpx creator= "StravaGPX Android" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1"> 
 <metadata> 
  <time>${currentTime.toISOString()}</time> 
 </metadata> 
 <trk> 
  <name>${runName}</name> 
  <type>9</type>
  <trkseg>`;

        let runPoints = '';
        let mSec = 60000;
        let startTime = new Date(currentTime - (runTime * mSec));
        let timeDiff = timeSplit;

        coordinatesArray.forEach(coordPair => {
            let timestamp = new Date(startTime.getTime() + (timeDiff * mSec)).toISOString();
            runPoints += `
   <trkpt lat="${coordPair.lat.toFixed(7)}" lon="${coordPair.lng.toFixed(7)}">
    <ele>0.0</ele>
    <time>${timestamp}</time>
   </trkpt>`;
            timeDiff += timeSplit;
        })

        runPoints += `
  </trkseg> 
 </trk>
</gpx>`;

        return xmlString + runPoints;
    }

     downloadGPXFile (gpxString,fileName) {
        const url = 'data:text/json;charset=utf-8,' + gpxString;
        const link = document.createElement('a');
        link.download = `${fileName}.gpx`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
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
            this.setState({ formattedCoords: formatted_coords });
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
                <span>
                <button id='delete-workout-button' onClick={()=>{deleteWorkout(workout.id).then(this.deduct(workout))}}>Delete Workout</button>
                <br/>
                {workout.route_id ? 
                    <div>
                    <br/>
                    <button id='gpx' onClick={()=>{
                        const gpxString = this.convertCoordinatesToGPXString(this.state.formattedCoords,workout.title,workout.time);
                        this.downloadGPXFile(gpxString,workout.title);
                                    }}>Download as GPX</button> 
                                    <br/>
                                    <span id='strav-text'>
                                        <span>
                                        GPX compatible with
                                        </span>
                                        <a href='https://www.strava.com/upload/select' target='_blank'>
                                        <img id='strava' src={window.strava}/>
                                        </a>
                                    </span>
                    </div>
                : ""}
                </span>
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