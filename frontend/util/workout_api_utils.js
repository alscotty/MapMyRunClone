export const fetchWorkouts=()=>(
    $.ajax({
        url:'api/workouts'
    })
);

export const fetchWorkout=(workoutId)=>(
    $.ajax({
        url:`/api/workouts/${workoutId}`,
        data:{workoutId}
    })
);

export const createWorkout=(workout)=>(
    $.ajax({
        url:'/api/workouts',    
        method:'post',
        data:{workout}
    })
);

export const deleteWorkout=(workoutId)=>(
    $.ajax({
        url:`/api/workouts/${workoutId}`,
        method:'delete'
    })
)