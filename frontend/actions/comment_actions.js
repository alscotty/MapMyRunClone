import * as APIUTIL from '../util/comment_api_utils'

export const RECEIVE_COMMENT='RECEIVE_COMMENT'
export const REMOVE_COMMENT='REMOVE_COMMENT'

const receiveComment=comment=>({
    type: RECEIVE_COMMENT,
    comment
});

const removeComment = comment =>({
    type: REMOVE_COMMENT,
    comment
})

export const createComment= comment=>dispatch=>(
    APIUTIL.createComment(comment)
        .then(comment1=>dispatch(receiveComment(comment1)))
)

export const deleteComment= comment=>dispatch=>(
    APIUTIL.deleteComment(comment)
        .then(comment2=>dispatch(removeComment(comment2)))
)