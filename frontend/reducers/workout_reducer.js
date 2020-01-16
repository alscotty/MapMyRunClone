import {
    RECEIVE_WORKOUTS,
    RECEIVE_WORKOUT,
    REMOVE_WORKOUT
} from '../actions/workout_actions'

const WorkoutsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_WORKOUTS:
            return action.workouts;
        case RECEIVE_WORKOUT:
            newState[action.workout.id] = action.workout;
            return newState;
        case REMOVE_WORKOUT:
            delete newState[action.workout.id];
            return newState;
        default:
            return state;
    }

}

export default WorkoutsReducer;