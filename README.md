# RapMyMun
[RapMyMun](https://rapmymun.herokuapp.com/#/)


RapMyMun is a fitness web application inspired by MapMyRun that allows for user running route creation. Users can log workout details, including duration, distance, and the route traveled. The app was created with React.js and Redux on the frontend, and Ruby on Rails/PostgreSQL on the backend.

The project was designed and built in a week, with some additional improvements added later on.

## Highlights
* Integrates Google Maps API to create run routes and enable distance tracking based on geolocation
* Adheres to React and ES6 best practices to generate a true single page reactive web app experience
* Developed a fluid UI to mimic the original website using SASS and HTML5
* Implemented user authentication with BCrypt password encryption

![home page](/app/assets/images/homePic.png)

## Features
### Route Creation

![create route](/app/assets/images/createPic.png)

* using Google Maps directions for rendering route and calculating distance:
```javascript
    calcAndDisplayRoute(){
        let waypts=[]
        for(let i=0; i<this.state.coordinates.length; i++){
            waypts.push({
                location: this.state.coordinates[i],
                stopover:false
            });
        }
        
        const {coordinates,directionsService,directionsRenderer}=this.state;
        directionsService.route({
            origin: coordinates[0],
            destination: coordinates[coordinates.length-1],
            waypoints:waypts,
            optimizeWaypoints: false,
            travelMode: 'WALKING'
        }, (response, status)=> {
            if(status === 'OK'){
                directionsRenderer.setDirections(response);
                //calc miles
                var route=response.routes;
                let dist=route[0].legs[0].distance.value;
                let routeInfo = { ...this.state.routeInfo };
                routeInfo.miles = (dist * 0.00062137).toFixed(2);
                this.setState({ routeInfo })
            } else {
                window.alert('Directions request failed due to' + status)
            } 
        });
    }
```

* Adding Google Roads API to keep the route on roads and prevent route from going through buildings, etc.
```javascript
    snapPoint(lat,lng){
        let posArr=[lat,lng]
        $.get('https://roads.googleapis.com/v1/snapToRoads', {
            interpolate: true,
            key: window.googleAPIKey,
            path: posArr.join(",")
        },(data)=>{
            this.processSnappedPosData(data)
        });
    }
```

### Activity Feed
* Map rendering for routes on activity feed:
```javascript
    renderIndMap(coordinates){
        let ren= new google.maps.DirectionsRenderer();
        let dir= new google.maps.DirectionsService();

        let map= new google.maps.Map(document.getElementById(`index-map-${this.props.route.id}`), {
            center: { lat: 37.773972, lng: -122.431297 },
            zoom: 13,
            maxZoom: 15,
            disableDefaultUI: true,
            gestureHandling:'none'
        });
        ren.setMap(map);

        let waypts = []
        for (let i = 0; i < coordinates.length; i++) {
            waypts.push({
                location: coordinates[i],
                stopover: false
            });
        }
```

### Dashboard for Workouts

![workouts](/app/assets/images/workoutPic.png)

* Workout dashboard dynamically renders depending on information provided (saved with a route, miles, time, etc.)
```javascript
      {workout.time !=0 && workout.miles ? (
                    <span>
                    <br/>
                    Time:{workout.time} min.
                    </span>
                    )
                    : ''}
                    <br/>
                    {workout.route ? (
                    (<span>
                        {`${workout.route.miles} miles`}
                    </span>)
                    ): 
                    (<span>
                        {`${workout.miles} miles`}
                    </span>)
                }
```

## Additional Resources

* [MVP List](https://github.com/alscotty/MapMyRunClone/wiki/MVP-List)
* [Schema](https://github.com/alscotty/MapMyRunClone/wiki/Database-Schema)
* [Sample State](https://github.com/alscotty/MapMyRunClone/wiki/Sample-State)
* [Frontend Routes](https://github.com/alscotty/MapMyRunClone/wiki/frontend-routes)
* [Backend Routes](https://github.com/alscotty/MapMyRunClone/wiki/backend-routes)

