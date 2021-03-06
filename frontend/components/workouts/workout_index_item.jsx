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


    readyMap(route) {

        let formatted_coords = [];
        if (route.route.coordinates) {
            route.route.coordinates.map(coord => {
                formatted_coords.push({ lat: coord['lat'], lng: coord['lng'] })
            });
            this.renderIndMap(formatted_coords)
        }
    }


    componentDidMount(){
        this.props.requestWorkout(this.props.workout.id)
            .then(()=>{
                if(this.props.workout.route_id){
                    this.props.requestRoute(this.props.workout.route_id)
                    .then(route=>this.readyMap(route))

                }
            })
    }


    render(){
        const {workout,deleteWorkout,currentUser}=this.props;

        return(
            <div id='workout-index-item'>
<<<<<<< HEAD
=======
                <span>
>>>>>>> futureImprov
                Title:{workout.title}
                {workout.description.length ? 
                <span>
                <br/>
                    Description:{workout.description}
                </span>
                : ''}

                {workout.route_id && workout.route ? (
                    <span>
                        <br/>
                        {currentUser.username} ran {workout.route.title}
                        <br/>
<<<<<<< HEAD
                    <div  className='workout-map' id={`workout-map-${this.props.workout.id}`}>
                    </div>
=======
>>>>>>> futureImprov
                    </span>
                ) : ''}

                {workout.time !=0 && workout.miles ? (
                    <span>
                    <br/>
                    Time:{workout.time} min.
                    {/* <br/> */}
                    {/* Pace: {(workout.time/workout.miles).toFixed(2)} min./mile */}
                    </span>
                    )
                    : ''}
                    <br/>
                    {workout.route ? (
                    (<span>
                        Miles:{workout.route.miles}
                    </span>)
                    ): 
                    (<span>
                    Miles:{workout.miles}
                    </span>)
                }
                <br/>
            <button id='delete-workout-button' onClick={()=>{deleteWorkout(workout.id)}}>Delete Workout</button>
<<<<<<< HEAD

=======
                </span>
                <span>
                {workout.route ? 
                    <div className='workout-map' id={`workout-map-${this.props.workout.id}`}></div>
            :''}
                </span>
>>>>>>> futureImprov
            </div>
        )
    }

}

export default WorkoutIndexItem;