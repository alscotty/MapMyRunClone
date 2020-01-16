import { connect } from 'react-redux'
import WorkoutRouteForm from './workout_route_form'

import {requestRoute} from '../../actions/route_actions'
import {
    createWorkout,
    clearWorkoutErrors
} from '../../actions/workout_actions'

const mstp=(state,ownProps)=>{
    const { entities } = state;
    const { session } = state;
    const { errors } = state;

    const route = entities.routes[ownProps.match.params.routeId]

    return({
    workout: {
        user_id: '',
        route_id: route.id,
        title: '',
        description: '',
        time: 0,
        miles: route.miles,
        },
    route:route,
    
    currentUser: entities.users[session.id],
    errors: errors.workouts,
    formType: 'Log Workout'
    });
};

const mdtp=dispatch=>({
    action: (workout) => dispatch(createWorkout(workout)),
    clearWorkoutErrors: () => dispatch(clearWorkoutErrors()),
    requestRoute: (routeId) => dispatch(requestRoute(routeId))

});


export default connect(mstp,mdtp)(WorkoutRouteForm);