import { connect } from 'react-redux'
import WorkoutForm from './workout_form'

import { requestWorkout,updateWorkout, clearWorkoutErrors } from '../../actions/workout_actions'

const mSTP = (state,ownProps) => {
    const { entities } = state;
    const { session } = state;
    const { errors } = state;
    let currentUser = entities.users[session.id]

    return ({
        workout: entities.workouts[ownProps.match.params.workoutId],
        currentUser: currentUser,
        errors: errors.workouts,
        hasMiles: false,
        formType: 'Update Workout'
    });
};

const mDTP = dispatch => ({
    action: (workout) => dispatch(updateWorkout(workout)),
    requestWorkout: (workoutId) => dispatch(requestWorkout(workoutId)),
    clearWorkoutErrors: () => dispatch(clearWorkoutErrors())
});

export default connect(mSTP, mDTP)(WorkoutForm);