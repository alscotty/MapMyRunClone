import React from 'react'

class RoutesForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: this.props.title,
            user_id: this.props.currentUser.id
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }



    handleSubmit(e) {
        e.preventDefault;

        this.props.action(this.state)
          .then(()=>{this.props.history.push('./routes')});

    }

    update(field) {
        return (
            e => {
                this.setState({ [field]: e.target.value })
            }
        )
    }


    render(){
        return(
            <div>
            <h1>Create New Route</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Title
                    <br/>
                <input type="text"
                        value={this.state.title}
                        onChange={this.update('title')}
                />
                </label>
                <br/>
            <input type="submit" value='Create Route'/>
            </form>
            </div>
        )
    }
}

export default RoutesForm;