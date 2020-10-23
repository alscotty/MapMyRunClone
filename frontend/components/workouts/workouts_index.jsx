import React from 'react'
import WorkoutIndexItem from './workout_index_item'
import * as d3 from 'd3'

class WorkoutsIndex extends React.Component{
    constructor(props){
        super(props);
       
        this.milesGraph = this.milesGraph.bind(this);
    }

    componentDidMount(){
        this.props.requestWorkouts()
        .then(()=>this.milesGraph());
    }

    milesGraph() {
    let data = this.props.workouts.reverse().map((workout,index) => {
        // var formatTime = d3.timeFormat("%B %d, %Y");
        // let workoutDate = formatTime(new Date(workout.created_at));

        return { miles: workout.miles, date: index }
        // return { miles: workout.miles, date: workoutDate }
    }).slice(0, 5);

    // let dimensions = document.getElementById('svg').getBoundingClientRect();
    let dimensions = { height:600, width:600 }
    let margin = { top: 20, right: 20, bottom: 30, left: 30 },
        width = dimensions.width - margin.left - margin.right,
        height = dimensions.height - margin.top - margin.bottom;
    let svg = d3.select('#svg').attr("width", dimensions.width).attr("height", dimensions.height);
    let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let x = d3.scaleLinear()
        .domain([1,5])
        .range([0, width]);

        let y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => { return d.miles; })])
        .range([height, 0]);

    let line = d3.line()
        .x((data) => { return x(data.date) })
        .y((data) => { return y(data.miles) });

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", `rgb(51, 130, 204)`)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 4.0)
        .attr("class", "line")
        .attr("d", line)

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format("d")))

    g.append("g").call(d3.axisLeft(y))
    .append("text").attr("fill", "#000").attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em").attr("text-anchor", "end").text("Miles");

    svg.append("text")
        .attr("x", (width + 60) / 2)
        .attr("y", 20)
        .style("text-anchor", "middle")
        .text("Recent Run Mileage");

}

    render(){
        const {workouts,currentUser,requestWorkout,deleteWorkout, requestRoute,route, createComment, deleteComment,createLike, deleteLike}=this.props

        let numRuns=workouts.length
        return(
            <div className='workout-index'>
                <h2 className='w-title' id='workouts'>Workouts</h2>
                <span id="row-me" className='workout-tile'>
                        <h4 id='to-date'><i>Activity to date:</i></h4>
                    <span id='activ-header'>
                        <h4 className='w-title' id='total-miles'>0</h4>
                        <h4 className='w-title' >{numRuns} workouts</h4>
                    </span>
                </span>
                <span id="row-me">
                        <div id="svg"></div>
                </span>
            {(workouts).reverse().map(workout=>{               
                return(
                <WorkoutIndexItem key={workout.id*3} workout={workout} createComment={createComment} deleteComment={deleteComment} currentUser={currentUser} route={route} deleteWorkout={deleteWorkout} requestWorkout={requestWorkout} requestRoute={requestRoute} createLike={createLike} deleteLike={deleteLike}/>
                )
            })}
            </div>
        )
    }

}

export default WorkoutsIndex;