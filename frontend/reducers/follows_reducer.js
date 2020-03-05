import{
    RECEIVE_FOLLOW,
    REMOVE_FOLLOW
} from '../actions/follow_actions'

const FollowsReducer = (state={}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_FOLLOW:
            return action.follow
        case REMOVE_FOLLOW:
            delete newState[action.follow.id]
            return newState;
        default:
            return state; 
    }

}

export default FollowsReducer;