import React from 'react'
import WorkoutForm from './workout_form'

class WorkoutRouteForm extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.requestRoute(this.props.match.params.routeId)
    }

    render(){
        const {action, formType, route, clearWorkoutErrors, workout,errors,currentUser}=this.props;
        return(
            <WorkoutForm action={action} errors={errors} currentUser={currentUser }formType={formType} route={route} clearWorkoutErrors={clearWorkoutErrors} workout={workout}/>
        )
    }

}

export default WorkoutRouteForm;