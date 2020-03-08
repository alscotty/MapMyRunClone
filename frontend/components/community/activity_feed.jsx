import React from 'react'
import WorkoutIndexItem from '../workouts/workout_index_item'

class ActivityFeed extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.requestWorkouts()
    }

    render() {
        const { workouts, currentUser, requestWorkout, deleteWorkout, requestRoute, route, createComment, deleteComment } = this.props
      
        let numRuns = currentUser.workouts.length;

           
        return (
            <div className='workout-index'>

                <h2 className='w-title' id='workouts'>Activity Feed</h2>
                <span id='row-me'>
                    <h4 id='to-date'><i>Activity to date:</i></h4>
                    <span id='activ-header'>
                    <h4 className='w-title' id='total-miles'>0</h4>
                    <h4 className='w-title' >{numRuns} workouts</h4>
                    </span>
                </span>
                <span id='row-me'>
                    <h3 className='w-title'> {currentUser.username}</h3>
                    <span id='activ-header'>
                    <h4 className='w-title'>Following {currentUser.followees.length}</h4>                                   
                    <h4 className='w-title'>Followers {currentUser.followers.length}</h4>
                    </span>     
                </span>

                {(workouts).reverse().map(workout => {
                    return (
                        <WorkoutIndexItem key={workout.id * 3} workout={workout} createComment={createComment} deleteComment={deleteComment} currentUser={currentUser} route={route} deleteWorkout={deleteWorkout} requestWorkout={requestWorkout} requestRoute={requestRoute} />
                    )
                })}
            </div>
        )
    }

}

export default ActivityFeed;