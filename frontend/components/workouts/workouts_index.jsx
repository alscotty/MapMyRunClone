import React from 'react'
import WorkoutIndexItem from './workout_index_item'
import * as d3 from 'd3'
import { AreaChart, LineChart } from 'react-chartkick'
import 'chart.js'

class WorkoutsIndex extends React.Component{
    constructor(props){
        super(props);
       this.state = {
           graphPoints: null,
       };

        this.milesGraph = this.milesGraph.bind(this);
    }

    componentDidMount(){
        this.props.requestWorkouts()
        .then(()=>this.milesGraph());
    }

    milesGraph() {
    let milesHash = {};
     this.props.workouts.reverse().slice(0,5).map((workout,index) => {
        // var formatTime = d3.timeFormat("%B %d, %Y");
        // let workoutDate = formatTime(new Date(workout.created_at));
        milesHash[index] = workout.miles
    });

    this.setState({graphPoints: milesHash});
    let canvas = document.querySelector('canvas');
    canvas.setAttribute('style','');
    document.querySelector('#chart-1').setAttribute('style','');
}

    render(){
        const {workouts,currentUser,requestWorkout,deleteWorkout, requestRoute,route, createComment, deleteComment,createLike, deleteLike}=this.props;
        const {graphPoints} = this.state;
        let numRuns=workouts.length
        return(
            <div className='workout-index'>
                <h2 className='w-title' id='workouts'>Workouts</h2>
                <span className='flex'>
                    <span id="row-me" className='workout-tile'>
                            <h4 id='to-date'><i>Activity to date:</i></h4>
                        <span id='activ-header'>
                            <h4 className='w-title' id='total-miles'>0</h4>
                            <h4 className='w-title' >{numRuns} workouts</h4>
                        </span>
                    </span>
                    <span id='row-me'>
                        {graphPoints ? 
                            <AreaChart className='graph' message={{ empty: 'No run data to show' }} height='150px' ytitle="Miles" xtitle="Recent Run Mileage" data={graphPoints} font-family='Arial Rounded MT Bold' font-weight='350px' style='' />
                        : ''}
                    </span>
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