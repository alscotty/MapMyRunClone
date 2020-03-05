const APIUtil = {

    followUser: id => APIUtil.changeFollowStatus(id, 'POST'),

    unfollowUser: id => APIUtil.changeFollowStatus(id, 'DELETE'),

    changeFollowStatus: (id, method) => (
        $.ajax({
            url: `/api/users/${id}/follow`,
            dataType: 'json',
            method
        })
    )

}

module.exports = APIUtil;