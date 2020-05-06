import { connect } from 'react-redux'
import WorkoutsIndex from './workouts_index'
import{
    requestWorkouts,
    requestWorkout,
    deleteWorkout
} from '../../actions/workout_actions'
import {
    requestRoute,
    requestRoutes
} from '../../actions/route_actions'
import {
    createComment,
    deleteComment
} from '../../actions/comment_actions'
import {createLike, deleteLike} from '../../actions/like_actions'


const mstp=state=>{
    const { entities } = state;
    const { session } = state;

    let workouts = Object.values(state.entities.workouts).filter(workout => workout.user_id === state.session.id)

    return({
        currentUser: (entities.users[session.id]),
        workouts:workouts
    });

};


const mdtp=dispatch=>({
    requestWorkouts: () => dispatch(requestWorkouts()),
    requestWorkout: (workoutId) => dispatch(requestWorkout(workoutId)),
    deleteWorkout: (workoutId) => dispatch(deleteWorkout(workoutId)),
    requestRoute: (routeId)=>dispatch(requestRoute(routeId)),
    requestRoutes: ()=>dispatch(requestRoutes()),
    createComment: (comment)=>dispatch(createComment(comment)),
    deleteComment: (comment)=>dispatch(deleteComment(comment)),
    createLike: (like)=>dispatch(createLike(like)),
    deleteLike: (like)=>dispatch(deleteLike(like))
});


export default connect(mstp,mdtp)(WorkoutsIndex);