import React from 'react';
import Timer from './timer';
import Tracker from './tracker';
import style from './style'

//material UI stuff
import Grid from '@material-ui/core/Grid';

class App extends React.Component {

  liftStartTime(){
    console.log("starttttttt..")
    this.refs.putTracker.putStartTime();
  }

  liftStopTime(){
    this.refs.putTracker.putStopTime();
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} container justify='center'>
          <Timer
            liftStartTime={()=>{this.liftStartTime()}}
            liftStopTime={()=>{this.liftStopTime()}}/>
        </Grid>
        <Grid item xs={12} container justify='center'>
          <Tracker
            ref='putTracker'/>
        </Grid>
      </Grid>
    );
  }
}
export default App;