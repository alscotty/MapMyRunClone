import React from 'react'

class WorkoutForm extends React.Component{
    constructor(props){
        super(props);
        this.state=this.props.workout;
        
        this.handleSubmit=this.handleSubmit.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault;

        this.props.action(this.state)
            .then(() => {
<<<<<<< HEAD
                this.props.history.push('/workouts')})
=======
                this.props.history.replace('/workouts')})
>>>>>>> futureImprov
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

        return(
           <div className='workout-form'>
                <h3>LOG A WORKOUT</h3>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.title} onChange={this.update('title')} placeholder='Title' />
                    <br/>
                    <br/>
                    <textarea cols="30" rows="10" value={this.state.description} onChange={this.update('description')} placeholder='Description'></textarea>
                    <br/>

                    Time(in minutes)
                    <br/>
                    <input type='number' value={this.state.time} onChange={this.update('time')} placeholder='Time (in minutes)' />
                    <br/>

                    Miles
                    <br/>
                    <input type='number' value={this.state.miles} onChange={this.update('miles')} placeholder='Miles' />

                    <br/>
                    <input type="submit" id='workout-button' value={this.props.formType} />

                    {this.renderErrors()}

                </form>



           </div>
        )
    }



}

export default WorkoutForm;