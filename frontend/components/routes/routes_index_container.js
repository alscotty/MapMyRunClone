import {connect} from 'react-redux'
import RoutesIndex from './routes_index';
<<<<<<< HEAD

const mstp=state=>({
    placeholder:null
});

const mdtp=dispatch=>({
    placeholder:null
=======
import{
    requestRoutes,
    requestRoute,
    deleteRoute
} from '../../actions/route_actions'


const mstp=state=>{
    const { entities } = state;
    const { session } = state;

    let routes = Object.values(state.entities.routes).filter(route => route.user_id === state.session.id);

    return({
        currentUser: (entities.users[session.id]),
        routes:routes,

        allUsers: Object.values(state.entities.users) 
    })

};

const mdtp=dispatch=>({
    requestRoutes: ()=>dispatch(requestRoutes()),
    requestRoute: (routeId)=>dispatch(requestRoute(routeId)),
    deleteRoute: (routeId)=>dispatch(deleteRoute(routeId))
>>>>>>> Routes_directions_snap
});

export default connect(mstp,mdtp)(RoutesIndex)