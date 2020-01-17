import {connect} from 'react-redux'
import WorkoutForm from './workout_form'

import { createWorkout, clearWorkoutErrors } from '../../actions/workout_actions'

const mSTP=state=>{
    const { entities } = state;
    const { session } = state;
    const { errors } = state;

    return({
        workout: {
            user_id: entities.users[session.id].id,
            route_id: '',
            title: '',
            description: '',
            time: 0,
            miles: 0,
        },

        currentUser: entities.users[session.id],
        errors: errors.workouts,
        formType:'Create Workout'
    });
};

const mDTP=dispatch=>({
    action: (workout)=>dispatch(createWorkout(workout)),
    clearWorkoutErrors: ()=>dispatch(clearWorkoutErrors())
});

export default connect(mSTP,mDTP)(WorkoutForm);