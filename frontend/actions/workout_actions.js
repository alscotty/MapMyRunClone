import * as WorkoutAPIUtils from '../util/workout_api_utils'

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS'
export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT'
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT'

export const RECEIVE_WORKOUT_ERRORS = 'RECEIVE_WORKOUT_ERRORS'
export const CLEAR_WORKOUT_ERRORS = 'CLEAR_WORKOUT_ERRORS'


//reg action creators
const receiveWorkouts = (workouts) => ({
    type: RECEIVE_WORKOUTS,
    workouts
});

const receiveWorkout = (workout) => ({
    type: RECEIVE_WORKOUT,
    workout
});

const removeWorkout = (workoutId) => ({
    type: REMOVE_WORKOUT,
    workoutId
})

export const receiveWorkoutErrors = (errors) => ({
    type: RECEIVE_WORKOUT_ERRORS,
    errors
})

export const clearWorkoutErrors = () => ({
    type: CLEAR_WORKOUT_ERRORS
})

//thunk actions
export const requestWorkouts = () => dispatch => (
    WorkoutAPIUtils.fetchWorkouts()
        .then((workouts) => dispatch(receiveWorkouts(workouts)))
)

export const requestWorkout = (workoutId) => dispatch => (
    WorkoutAPIUtils.fetchWorkout(workoutId)
        .then((workout) => dispatch(receiveWorkout(workout)))
)

export const createWorkout = (workout) => dispatch => (
    WorkoutAPIUtils.createWorkout(workout)
        .then((workout) => dispatch(receiveWorkout(workout)),
            err => { dispatch(receiveWorkoutErrors(err.responseJSON)) }
        )
);

export const deleteWorkout = (workoutId) => dispatch => (
    WorkoutAPIUtils.deleteWorkout(workoutId)
        .then(() => dispatch(removeWorkout(workoutId)))
)
