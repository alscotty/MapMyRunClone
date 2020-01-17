import React from 'react'
import WorkoutIndexItem from './workout_index_item'

class WorkoutsIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.requestWorkouts();
        // this.props.requestRoutes();
    }

    render(){
        const {workouts,currentUser,requestWorkout,deleteWorkout, requestRoute}=this.props

        return(
            <div className='workout-index'>
                <h2>Workouts</h2>
            {workouts.map(workout=>{
                return(
                <WorkoutIndexItem key={workout.id*3} workout={workout} currentUser={currentUser} deleteWorkout={deleteWorkout} requestWorkout={requestWorkout} requestRoute={requestRoute} />
                )
            })}
            </div>
        )
    }

}

export default WorkoutsIndex;