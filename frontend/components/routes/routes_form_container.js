import { connect } from 'react-redux'
import RoutesForm from './routes_form'
import {createRoute,clearRouteErrors} from '../../actions/route_actions'

const mstp = state => {
    const {entities}=state;
    const {session}=state;
    const {errors}=state;

    return({
    title:'',
    currentUser: entities.users[session.id],
    errors: errors.routes
    })
};

const mdtp = dispatch => ({
    action: (route,coordinates)=>dispatch(createRoute(route,coordinates)),
    clearRouteErrors: ()=>dispatch(clearRouteErrors())

});

export default connect(mstp, mdtp)(RoutesForm);