import React from 'react'
import WorkoutIndexItem from './workout_index_item'

class WorkoutsIndex extends React.Component{
    constructor(props){
        super(props);
       
    }

    componentDidMount(){
        this.props.requestWorkouts()
    }

    render(){
        const {workouts,currentUser,requestWorkout,deleteWorkout, requestRoute,route, createComment, deleteComment,createLike, deleteLike}=this.props
        let numRuns=workouts.length
        return(
            <div className='workout-index'>
                <h2 className='w-title' id='workouts'>Workouts</h2>
                <span id='w-me'>
                    <h4><i>Activity to date:</i></h4>
                    <h4 className='w-title' id='total-miles'>0</h4>
                    <h4 className='w-title' >{numRuns} workouts</h4>
                </span>
            {(workouts).reverse().map(workout=>{               
                return(
                <WorkoutIndexItem key={workout.id*3} workout={workout} createComment={createComment} deleteComment={deleteComment} currentUser={currentUser} route={route} deleteWorkout={deleteWorkout} requestWorkout={requestWorkout} requestRoute={requestRoute} createLike={createLike} deleteLike={deleteLike}/>
                )
            })}
            </div>
        )
    }

}

export default WorkoutsIndex;