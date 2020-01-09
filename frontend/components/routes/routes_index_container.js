import {connect} from 'react-redux'
import RoutesIndex from './routes_index';
import{
    requestRoutes,
    deleteRoute
} from '../../actions/route_actions'


const mstp=state=>{
    const { entities } = state;
    const { session } = state;

    return({
        currentUser: (entities.users[session.id]),
        routes: Object.values(state.entities.routes)
    })

};

const mdtp=dispatch=>({
    requestRoutes: ()=>dispatch(requestRoutes()),
    deleteRoute: (routeId)=>dispatch(deleteRoute(routeId))
});

export default connect(mstp,mdtp)(RoutesIndex)