import React from 'react'

class RoutesForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: this.props.title,
            user_id: this.props.currentUser.id
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.renderMap=this.renderMap.bind(this);
        this.makeMap=this.makeMap.bind(this);
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
    };

    makeMap(){
            new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            });
    };

    componentDidMount(){
          this.makeMap();
    };   

    renderMap(){ 
        return(
            <div>
                <div id="map"></div>
                    <script src={`https://maps.googleapis.com/maps/api/js?key=${window.googleAPIKey}&callback=initMap`}
                        async defer></script>

            </div>
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

            {this.renderMap()}

            <br/>
            <input type="submit" value='Create Route'/>
            </form>
            </div>
        )
    }
}

export default RoutesForm;