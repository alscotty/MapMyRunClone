import {
    RECEIVE_ROUTES,
    RECEIVE_ROUTE,
    REMOVE_ROUTE
} from '../actions/route_actions'

const RoutesReducer=(state={},action)=>{
    Object.freeze(state);
    let newState=Object.assign({},state);

    switch (action.type) {
        case RECEIVE_ROUTES:
            return action.routes;    
        case RECEIVE_ROUTE:
            newState[action.route.id]=action.route;
            return newState;
        case REMOVE_ROUTE:
            delete newState[action.routeId]
            return newState;    
        default:
            return state;
    }

}

export default RoutesReducer;