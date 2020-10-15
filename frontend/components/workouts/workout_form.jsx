import React from 'react'
import {withRouter} from 'react-router-dom'

class WorkoutForm extends React.Component{
    constructor(props){
        super(props);
        this.state=this.props.workout;
        
        this.handleSubmit=this.handleSubmit.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault();

        this.props.action(this.state)
            .then(() => {
                this.props.history.push('/workoutsAll')})
    }

    update(field) {
        return (
            e => {
                this.setState({ [field]: e.target.value })
            }
        )
    }

    componentWillUnmount() {
        this.props.clearWorkoutErrors();
    }

    renderErrors() {
        const { errors } = this.props;
        return (
            <ul className='workout-errors'>
                {errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }


    render(){
        const { formType } = this.props;
        return(
           <div className='workout-form'>
          
                <h3 id='workout-title'>LOG A WORKOUT</h3>
                <form onSubmit={this.handleSubmit} className='formy'>
                    <br/>
                    Workout Name:
                    <br/>
                    <input type="text" value={this.state.title} onChange={this.update('title')} />
                    <br/>
                    How did it go?
                    <br/>
                    <textarea cols="30" rows="10" value={this.state.description} onChange={this.update('description')}></textarea>
                    <br/>
                    <span id='mini-flex'>
                   
                        <label> Duration (min.)
                        <br/>
                        <input type='number' value={this.state.time} onChange={this.update('time')} />
                        </label>
                        <br/>
                        <label>
                        Miles
                        <br/>
                        {formType == 'Create Workout' ? 
                        <input type='number' value={this.state.miles} onChange={this.update('miles')} />
                        :
                        <input id='not-allowed' type='number' value={this.state.miles}/>                        
                        }
                        </label>
                    </span>
                    <br/>
                    <input type="submit" id='workout-button' value={formType} />

                    {this.renderErrors()}

                </form>



           </div>
        )
    }



}

export default withRouter(WorkoutForm);