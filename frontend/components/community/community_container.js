import { connect } from 'react-redux';
import Community from './community'
import {requestUsers} from '../../actions/user_actions'
import {createFollow, deleteFollow} from '../../actions/follow_actions'

const mapStateToProps = ({ session, entities: { users,follows }}) => {
    let actualUsers=Object.values(users)
    let currentUser= users[session.id]
    let followeeIds=[];
    currentUser.out_follows.forEach(followee=>{
        followeeIds.push(followee.followee_id)
    })


    return {
        currentUser: currentUser,
        allUsers: actualUsers,
        followeeIds: followeeIds,
        follows: follows
    };
};

const mapDispatchToProps = dispatch => ({
    requestUsers: () => dispatch(requestUsers()),
    createFollow: (id) => dispatch(createFollow(id)),
    deleteFollow: (id) => dispatch(deleteFollow(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Community);
