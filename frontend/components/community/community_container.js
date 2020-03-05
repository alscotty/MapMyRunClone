import { connect } from 'react-redux';
import Community from './community'
import {requestUsers} from '../../actions/user_actions'
import {createFollow, deleteFollow} from '../../actions/follow_actions'

const mapStateToProps = ({ session, entities: { users } }) => {
    let actualUsers=Object.values(users)

    return {
        currentUser: users[session.id],
        allUsers: actualUsers
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
