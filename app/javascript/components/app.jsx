import React from 'react';
import Timer from './timer';
import Tracker from './tracker';
import style from './style'

//material UI stuff
import Grid from '@material-ui/core/Grid';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      time:0,
      distance:0,
    }
  }

  liftStartTime(){
    console.log("starttttttt..")
    this.refs.putTracker.putStartTime();
  }

  liftStopTime(){
    this.refs.putTracker.putStopTime();
  }

  liftSaveTime(v){
    console.log('time is'+v)
    this.refs.putTracker.putSaveTime();
    this.setState({
      time:v
    })
  }

  liftSaveDistance(v){
    console.log('distance is'+v)
    this.setState({
      distance:v
    })
  }

  render() {

    console.log('this.state.time')
    console.log(this.state.time)
    console.log('this.state.distance')
    console.log(this.state.distance)

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} container justify='center'>
          <Timer
            liftStartTime={()=>{this.liftStartTime()}}
            liftStopTime={()=>{this.liftStopTime()}}
            liftSaveTime={(v)=>{this.liftSaveTime(v)}}/>
        </Grid>
        <Grid item xs={12} container justify='center'>
          <Tracker
            ref='putTracker'
            liftSaveDistance={(v)=>{this.liftSaveDistance(v)}}/>
        </Grid>
      </Grid>
    );
  }
}
export default App;