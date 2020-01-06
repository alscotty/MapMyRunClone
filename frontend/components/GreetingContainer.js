import {connect} from 'react-redux'
import Greeting from './Greeting'
import {logout} from '../actions/session_actions'

const mSTP = ({ session, entities: { users } }) => {
    return {
        currentUser: session.currentUser
    };
};
// users[session.id]


const mDTP=dispatch=>({
    logout: ()=>dispatch(logout())
})

export default connect(mSTP,mDTP)(Greeting);