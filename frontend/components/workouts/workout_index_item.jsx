import React from 'react'

class WorkoutIndexItem extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.requestWorkout(this.props.workout.id)
    }

    render(){
        const {workout, currentUser,requestWorkout,deleteWorkout}=this.props;

        return(
            <div id='workout-index-item'>
                Title:{workout.title}
                <br/>
                Description:{workout.description}
                <br />
                Time:{workout.time}
                <br/>
                Workout:{workout.miles}
            
            <button id='delete-workout-button' onClick={()=>{deleteWorkout(workout.id)}}>Delete Workout</button>

            </div>
        )
    }

}

export default WorkoutIndexItem;