import React from 'react'

class WorkoutIndexItem extends React.Component{
    constructor(props){
        super(props);

        this.renderIndMap = this.renderIndMap.bind(this)
        this.readyMap = this.readyMap.bind(this)
    }

    renderIndMap(coordinates) {
        let ren = new google.maps.DirectionsRenderer();
        let dir = new google.maps.DirectionsService();

        let map = new google.maps.Map(document.getElementById(`workout-map-${this.props.workout.id}`), {
            center: { lat: 37.773972, lng: -122.431297 },
            zoom: 13,
            maxZoom: 15,
            disableDefaultUI: true,
            gestureHandling: 'none'
        });
        ren.setMap(map);

        let waypts = []
        for (let i = 0; i < coordinates.length; i++) {
            waypts.push({
                location: coordinates[i],
                stopover: false
            });
        }
        dir.route({
            origin: coordinates[0],
            destination: coordinates[coordinates.length - 1],
            waypoints: waypts,
            optimizeWaypoints: false,
            travelMode: 'WALKING'
        }, (response, status) => {
            if (status === 'OK') {
                ren.setDirections(response);

            } else {
                window.alert('Directions request failed due to' + status)
            }
        });
    }


    readyMap() {

        let formatted_coords = [];
        if (this.props.route.coordinates) {
            this.props.route.coordinates.map(coord => {
                formatted_coords.push({ lat: coord['lat'], lng: coord['lng'] })
            });
            this.renderIndMap(formatted_coords)
        }
    }


    componentDidMount(){
        this.props.requestWorkout(this.props.workout.id)
            .then(()=>{
                if(this.props.workout.route_id != ''){
                    this.props.requestRoute(this.props.workout.route_id)
                    .then(()=>{this.readyMap()})
                }
            })
    }


    render(){
        const {workout,deleteWorkout}=this.props;

        return(
            <div id='workout-index-item'>
                Title:{workout.title}
                <br/>
                Description:{workout.description}

                {workout.route_id ? (
                    <div id={`workout-map-${this.props.workout.id}`}>
                    </div>
                ) : ''}

                {workout.time !=0 ? (
                    <span>
                    <br/>
                    Time:{workout.time} min.
                    <br/>
                    Pace: {(workout.time/workout.miles).toFixed(2)} min./mile
                    </span>
                    )
                : ''}
                <br/>
                Workout:{workout.miles}
                <br/>
            <button id='delete-workout-button' onClick={()=>{deleteWorkout(workout.id)}}>Delete Workout</button>

            </div>
        )
    }

}

export default WorkoutIndexItem;