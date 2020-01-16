import React from 'react'

class WorkoutForm extends React.Component{
    constructor(props){
        super(props);
        this.state=this.props.workout;
        
        this.handleSubmit=this.handleSubmit.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault;

        const { currentUser } = this.props
        this.state.user_id = currentUser.id;

        this.props.action(this.state)
            .then(() => {
                this.props.history.push('/workouts')})
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
           <div>
                <h1>{this.props.formType}</h1>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.title} onChange={this.update('title')} placeholder='Title' />
                    <br/>
                    <textarea cols="30" rows="10" value={this.state.description} onChange={this.update('description')} placeholder='description'></textarea>
                    <br/>

                    Time(in minutes)
                    <br/>
                    <input type='number' value={this.state.time} onChange={this.update('time')} placeholder='Time (in minutes)' />
                    <br/>

                    Miles
                    <br/>
                    <input type='number' value={this.state.miles} onChange={this.update('miles')} placeholder='Miles' />

                    <br/>
                    <input type="submit" value={this.props.formType} />

                    {this.renderErrors()}

                </form>



           </div>
        )
    }



}

export default WorkoutForm;