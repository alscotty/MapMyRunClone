import { connect } from 'react-redux'
import WorkoutRouteForm from './workout_route_form'

import { withRouter } from 'react-router-dom'

import { requestRoute } from '../../actions/route_actions'
import { requestWorkout, updateWorkout, clearWorkoutErrors } from '../../actions/workout_actions'

const mstp = (state, ownProps) => {
    const { entities,session,errors } = state;

    const route = entities.routes[ownProps.match.params.routeId];
    const currentUser = entities.users[session.id];

    return ({
        workout: entities.workouts[ownProps.match.params.workoutId],
        // workout: {
        //     user_id: currentUser.id,
        //     route_id: ownProps.match.params.routeId,
        //     title: '',
        //     description: '',
        //     time: 0,
        //     miles: route.miles,
        //     creator: currentUser.username
        // },
        route: route,

        currentUser: currentUser,
        errors: errors.workouts,
        hasMiles: true,
        formType: 'Update Workout'
    });
};

const mdtp = dispatch => ({
    action: (workout) => dispatch(updateWorkout(workout)),
    clearWorkoutErrors: () => dispatch(clearWorkoutErrors()),
    requestRoute: (routeId) => dispatch(requestRoute(routeId)),
    requestWorkout: (workoutId) => dispatch(requestWorkout(workoutId))
});


export default withRouter(connect(mstp, mdtp)(WorkoutRouteForm));