import { connect } from 'react-redux'
import WorkoutsIndex from './workouts_index'
import{
    requestWorkouts,
    requestWorkout,
    deleteWorkout
} from '../../actions/workout_actions'


const mstp=state=>{
    const { entities } = state;
    const { session } = state;

    let workouts = Object.values(state.entities.workouts).filter(workout => workout.user_id === state.session.id);

    return({
        currentUser: (entities.users[session.id]),
        workouts:workouts
    });

};


const mdtp=dispatch=>({
    requestWorkouts: () => dispatch(requestWorkouts()),
    requestWorkout: (workoutId) => dispatch(requestWorkout(workoutId)),
    deleteWorkout: (workoutId) => dispatch(deleteWorkout(workoutId))
});


export default connect(mstp,mdtp)(WorkoutsIndex);