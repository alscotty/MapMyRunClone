import { connect } from 'react-redux'

import ActivityFeed from './activity_feed'

import {
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
import {createLike,deleteLike} from '../../actions/like_actions'

const mstp = state => {
    const { entities } = state;
    const { session } = state;
    let currentUser = entities.users[session.id];

    let followeeIds = [currentUser.id];
    currentUser.out_follows.forEach(followee => {
        followeeIds.push(followee.followee_id)
    })

    let workouts = Object.values(state.entities.workouts).filter(workout => followeeIds.includes(workout.user_id))

    return ({
        currentUser: currentUser,
        workouts: workouts,
    });

};


const mdtp = dispatch => ({
    requestWorkouts: () => dispatch(requestWorkouts()),
    requestWorkout: (workoutId) => dispatch(requestWorkout(workoutId)),
    deleteWorkout: (workoutId) => dispatch(deleteWorkout(workoutId)),
    requestRoute: (routeId) => dispatch(requestRoute(routeId)),
    requestRoutes: () => dispatch(requestRoutes()),
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (comment) => dispatch(deleteComment(comment)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (like) => dispatch(deleteLike(like))
});


export default connect(mstp, mdtp)(ActivityFeed);