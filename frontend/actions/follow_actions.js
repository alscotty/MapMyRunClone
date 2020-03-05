import {APIUtil} from '../util/follows_api_utils'

export const RECEIVE_FOLLOW='RECEIVE_FOLLOW'
export const REMOVE_FOLLOW='REMOVE_FOLLOW'

const receiveFollow = follow => ({
    type: RECEIVE_FOLLOW,
    follow
});

const removeFollow = follow => ({
    type: RECEIVE_FOLLOW,
        follow
});

export const createFollow = (id) => dispatch =>(
    APIUtil.followerUser(id)
        .then(follow=>dispatch(receiveFollow(follow)))
);

export const deleteFollow = id => dispatch => (
    APIUtil.unfollowUser(id)
        .then(follow=>dispatch(removeFollow(follow)))
)
