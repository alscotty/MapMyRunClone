import {
    RECEIVE_WORKOUT_ERRORS,
    CLEAR_WORKOUT_ERRORS
} from '../actions/workout_actions'

const WorkoutErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WORKOUT_ERRORS:
            return action.errors;
        case CLEAR_WORKOUT_ERRORS:
            return [];
        default:
            return state;
    }
};

export default WorkoutErrorsReducer;