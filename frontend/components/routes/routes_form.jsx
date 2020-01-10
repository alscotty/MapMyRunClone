import React from 'react'

class RoutesForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            routeInfo:{
                title: this.props.title,
                user_id: this.props.currentUser.id,
            },
            map:'',
            poly:'',
            path:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.renderMap=this.renderMap.bind(this);
        this.makeMap=this.makeMap.bind(this);
        this.addLatLng=this.addLatLng.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault;
        debugger
        this.props.action(this.state.routeInfo)
          .then(()=>{this.props.history.push('./routes')});

    }

    updateTitle() {
        return (
            e => {
                // this.setState({ [field]: e.target.value })
                //sets up dummy object, used to assign nested state!
                let routeInfo={...this.state.routeInfo};
                routeInfo.title= e.target.value;
                this.setState({routeInfo})
            }
        )
    };

    addLatLng(e) {
        const {poly}=this.state;
        this.setState({path: poly.getPath() })
        //easier way to get coordinates on the go, put in state somewhere:
        // console.log(e.latLng['lat']())
        // console.log(e.latLng['lng']())

        this.state.path.push(e.latLng)

            new google.maps.Marker({
            position: e.latLng,
            title: '#'+this.state.path.getLength(),
            map: this.state.map
        })

    }

    //maybe should use this.setState({}) check later if errors
    makeMap(){
            this.state.map=new google.maps.Map(document.getElementById('map'), {
                center: { lat: 37.773972, lng: -122.431297 },
                zoom: 13
            });
            this.state.poly= new google.maps.Polyline({
                strokeColor:'#79d743',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            const {map,poly}=this.state;
            poly.setMap(map);
            map.addListener('click',this.addLatLng);
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
                        value={this.state.routeInfo.title}
                        onChange={this.updateTitle()}
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