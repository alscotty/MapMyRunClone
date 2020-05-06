import * as APIUTIL from '../util/like_api_utils'

export const RECEIVE_LIKE = 'RECEIVE_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'

const receiveLike = like =>({
    type: RECEIVE_LIKE,
    like
})

const removeLike = like => ({
    type: REMOVE_LIKE,
    like
})

export const createLike = like => dispatch => (
    APIUTIL.createLike(like)
        .then(like=>dispatch(receiveLike(like)))
);

export const deleteLike =like=>dispatch=>(
    APIUTIL.deleteLike(like)
        .then(like=>dispatch(removeLike(like)))
);