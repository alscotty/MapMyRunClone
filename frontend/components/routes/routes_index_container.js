import {connect} from 'react-redux'
import RoutesIndex from './routes_index';
import{
    requestRoutes,
    requestRoute,
    deleteRoute
} from '../../actions/route_actions'


const mstp=state=>{
    const { entities } = state;
    const { session } = state;

    return({
        currentUser: (entities.users[session.id]),
        routes: Object.values(state.entities.routes),
        allUsers: Object.values(state.entities.users) 
    })

};

const mdtp=dispatch=>({
    requestRoutes: ()=>dispatch(requestRoutes()),
    requestRoute: (routeId)=>dispatch(requestRoute(routeId)),
    deleteRoute: (routeId)=>dispatch(deleteRoute(routeId))
});

export default connect(mstp,mdtp)(RoutesIndex)