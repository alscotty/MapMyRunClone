import React from 'react'
import WorkoutIndexItem from './workout_index_item'

class WorkoutsIndex extends React.Component{
    constructor(props){
        super(props);
       
        this.milesGraph = this.milesGraph.bind(this);
    }

    componentDidMount(){
        this.props.requestWorkouts()
    }

    milesGraph(milesData) {
    if (!document.getElementById('svg')){
        return
    }
    let dimensions = document.getElementById('svg').getBoundingClientRect();
    let margin = { top: 20, right: 20, bottom: 30, left: 60 },
        width = dimensions.width - margin.left - margin.right,
        height = dimensions.height - margin.top - margin.bottom;
    let svg = d3.select('#svg').attr("width", dimensions.width).attr("height", dimensions.height);
    let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let x = d3.scaleLinear()
        .range([0, width]);

    let y = d3.scaleLinear()
        .range([height, 0]);

        x.domain(d3.extent(milesData, (d) => { return d.date; }));
        y.domain([0, d3.max(milesData, (d) => { return d.miles; })]);

        let line = d3.line()
            .x((milesData) => { return x(milesData.date) })
            .y((milesData) => { return y(milesData.miles) });

        // g.append("path").datum(milesData).attr("fill", "none").attr("stroke", `rgb(51, 130, 204)`).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 4.0).attr("d", line)
    g.append("path")
        .attr('class','line')
        .attr('d',line(milesData))

    g.append("g").attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.format("d")))


    g.append("g").call(d3.axisLeft(y)).append("text").attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text("Miles");

    svg.append("text")
        .attr("x", (width + 60) / 2)
        .attr("y", 20)
        .style("text-anchor", "middle")
        .text("Recent Run Mileage");

}

    render(){
        const {workouts,currentUser,requestWorkout,deleteWorkout, requestRoute,route, createComment, deleteComment,createLike, deleteLike}=this.props

        let numRuns=workouts.length
        let recentRunsData = workouts.reverse().map(workout=>{
            let workoutDate = new Date(workout.created_at);
            return {miles:workout.miles, date: `${workoutDate.getMonth()}/${workoutDate.getDay()}` }
        }).slice(0,5);
        recentRunsData ? this.milesGraph(recentRunsData) : "";
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