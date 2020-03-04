import * as APIUtil from '../util/users_api_utils'

export const RECEIVE_ALL_USERS ='RECEIVE_ALL_USERS'

//reg action creators
export const receiveUsers = (users) => ({
    type: RECEIVE_ALL_USERS,
    users
});

//thunk actions

export const requestUsers = () => dispatch => (
    APIUtil.getUsers()
        .then(users=> dispatch(receiveUsers(users)))
)


