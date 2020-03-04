import { connect } from 'react-redux';
import Community from './community'
import { getUsers } from '../../util/users_api_utils';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
        currentUser: users[session.id],
        allUsers: users
    };
};

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Community);
