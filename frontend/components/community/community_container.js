import { connect } from 'react-redux';
import Community from './community'
import {requestUsers} from '../../actions/user_actions'

const mapStateToProps = ({ session, entities: { users } }) => {
    let actualUsers=Object.values(users)

    return {
        currentUser: users[session.id],
        allUsers: actualUsers
    };
};

const mapDispatchToProps = dispatch => ({
    requestUsers: () => dispatch(requestUsers())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Community);
