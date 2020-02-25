import React from 'react'
import WorkoutIndexItem from './workout_index_item'

class WorkoutsIndex extends React.Component{
    constructor(props){
        super(props);
       
    }

    componentDidMount(){
        this.props.requestWorkouts()
    }

    // dateSorter(a, b) {
    //     let comparison = 0

    //     if (a.updated_at > b.updated_at) {
    //         comparison = 1
    //     } else {
    //         comparison = -1
    //     }

    //     return comparison;
    // }
    // .sort(this.dateSorter)

    render(){
        const {workouts,currentUser,requestWorkout,deleteWorkout, requestRoute,route}=this.props
        return(
            <div className='workout-index'>
                <h2 id='w-title'>Workouts</h2>
                <h3 id='total-miles'>0</h3>
            {(workouts).reverse().map(workout=>{               
                return(
                <WorkoutIndexItem key={workout.id*3} workout={workout} currentUser={currentUser} route={route} deleteWorkout={deleteWorkout} requestWorkout={requestWorkout} requestRoute={requestRoute} />
                )
            })}
            </div>
        )
    }

}

export default WorkoutsIndex;