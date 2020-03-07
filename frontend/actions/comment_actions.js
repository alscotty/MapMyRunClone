import * as APIUTIL from '../util/comment_api_utils'
import { REMOVE_FOLLOW } from './follow_actions';

export const RECEIVE_COMMENT='RECEIVE_COMMENT'
export const REMOVE_COMMENT='REMOVE_COMMENT'

const receiveComment=comment=>({
    type: RECEIVE_COMMENT,
    comment
});

const removeComment = comment =>({
    type: REMOVE_FOLLOW,
    comment
})

export const createComment= comment=>dispatch=>(
    APIUTIL.createComment(comment)
        .then(comment=>dispatch(receiveComment(comment)))
)

export const deleteComment= comment=>dispatch=>(
    APIUTIL.deleteComment(comment)
        .then(comment=>dispatch(removeComment(comment)))
)