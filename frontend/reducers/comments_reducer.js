import {
    RECEIVE_COMMENT,
    REMOVE_COMMENT
} from '../actions/comment_actions'

const CommentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_COMMENT:
            return action.comment
        case REMOVE_COMMENT:
            delete newState[action.comment]
            return newState;
        default:
            return state;
    }

}

export default CommentsReducer;