import { connect } from 'react-redux'
import {requestRoute} from '../../actions/route_actions'
import RouteShow from './route_show'

const mSTP=(state,ownProps)=>{
    return({
    route: state.entities.routes[ownProps.match.params.routeId]
})
};

const mDTP=dispatch=>({
    requestRoute: (routeId)=>dispatch(requestRoute(routeId))
});

export default connect(mSTP,mDTP)(RouteShow);