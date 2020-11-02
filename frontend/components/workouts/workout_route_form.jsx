import React from 'react'
import WorkoutForm from './workout_form'

class WorkoutRouteForm extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        if (this.props.formType == 'Update Workout'){
            this.props.requestWorkout(this.props.workout.id)
        } 
        this.props.requestRoute(this.props.match.params.routeId)
    }

    render(){
        const {action, formType, route, clearWorkoutErrors, workout,errors,currentUser,hasMiles}=this.props;
        if(formType == 'Update Workout' && !workout){
            return null
        }
        return(
            <WorkoutForm history={this.props.history} action={action} errors={errors} currentUser={currentUser }formType={formType} 
            route={route} clearWorkoutErrors={clearWorkoutErrors} workout={workout} hasMiles={hasMiles}/>
        )
    }

}

export default WorkoutRouteForm;