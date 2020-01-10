import { connect } from 'react-redux'
import RoutesForm from './routes_form'
import {createRoute} from '../../actions/route_actions'

const mstp = state => {
    const {entities}=state;
    const {session}=state;

    return({
    title:'',
    currentUser: entities.users[session.id]
    })
};

const mdtp = dispatch => ({
    action: (route,coordinates)=>dispatch(createRoute(route,coordinates))
});

export default connect(mstp, mdtp)(RoutesForm);