import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ms from 'parse-ms';

let watchID = null;
let counter = 1;

class Tracker extends React.Component {

  constructor(){
    super()
    this.state = {
      distance:0,
      templat:'',
      templong:'',
      counter:1,
      testing:false,
      pacer:0,
      currentPace:0,
      tempDist:0,
    }
  }

  calc(event){
    let a = document.getElementById("lat1").value;
    let b = document.getElementById("lon1").value;
    let c = document.getElementById("lat2").value;
    let d = document.getElementById("lon2").value;
    let e = "K"

    this.distance(a,b,c,d,e)
  }

  distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        console.log('distannceeeeeee'+dist)
        dist = this.state.distance + dist;
        this.setState ({
          distance:dist,
        })
        console.log("distance check done")
        //return dist;
    }
  }

  // to get update location
  showLocation(position) {
    console.log("watching......")
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //alert("Latitude : " + latitude + " Longitude: " + longitude);
    console.log('latitude')
    console.log(latitude)
    console.log('longitude')
    console.log(longitude)
    console.log('statelat')
    console.log(this.state.templat)
    console.log('statelong')
    console.log(this.state.templong)
    if(this.state.templat && latitude){
        this.distance(latitude, longitude, this.state.templat, this.state.templong, "K")
      }
    this.setState({
      templat: latitude,
      templong: longitude
    })
    console.log("latlong state done")
  }

  errorHandler(err) {
    if(err.code == 1) {
      alert("Error: Access is denied!");
    } else if( err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }

  updateloc(event){
    console.log("once?")
    if(navigator.geolocation) {
      var options = {
        timeout:Infinity,
        enableHighAccuracy: true};
      let geoLoc = navigator.geolocation;
      watchID = geoLoc.watchPosition(
        (position)=>{this.showLocation(position)},
        (err)=>{this.errorHandler(err)},options)
    } else {
      alert("Sorry, browser does not support geolocation!");
    }
  }

  stop(event){
    this.setState({
      templat:'',
      templong:'',
    })
    if(watchID){
      navigator.geolocation.clearWatch(watchID);
      console.log("stop successful")
    }
  }

  putStartTime(){
    this.updateloc()
  }

  putStopTime(){
    this.stop()
  }

  putSaveTime(object){
    this.stop()
    object.distance = this.state.distance
    console.log(object)
    this.props.liftSaveDistance(object)
    this.setState({
      distance:0,
      pacer:0,
      currentPace:0,
      templat:'',
      templong:'',
      tempDist:0,
      counter: 0,
    })
  }

  putpacer(v){
    //v is milliseconds of every 10 seconds, time can be changed in timer.jsx
    console.log('putpacer'+v)

    //calculate average pace
    let x = (1/this.state.distance)*(v*(this.state.counter))
    console.log(this.state.counter)
    this.setState({
      pacer:x,
      counter: this.state.counter+1})

    //calculate current pace
    let y = (1/(this.state.distance - this.state.tempDist))*v
        if (y == Infinity) {
      y = 0;
    }
    this.setState({
      tempDist: this.state.distance,
      currentPace: y,
    })
  }

  testing(){
    if (this.state.testing == true) {
      this.setState({testing:false})
    }
    else { this.setState({testing:true}) }
  }

    render() {
      let cP = ms(this.state.currentPace)
      let aP = ms(this.state.pacer)
      if(this.state.currentPace == 0) {
        cP.minutes = 0;
        cP.seconds = '00';
      }

      if(this.state.pacer == Infinity || this.state.pacer == 0){
        aP.minutes = 0;
        aP.seconds = '00';
      }
      if (aP.seconds.length == 1) {
        aP.seconds = "0"+aP.seconds
      }
      if (cP.seconds.length == 1) {
        cP.seconds = "0"+cP.seconds
      }

    return (
      <Grid container spacing={0} style={{maxWidth:'210px',marginTop:'30px'}}>
        <Grid item xs={12}>
          <div>
            <span className='bb' style={{padding:'2px'}}>Distance</span>
          </div>
          <Grid container className='stats'>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>{(this.state.distance).toFixed(2)}</Grid>
            <Grid item xs={3}><span style={{fontSize:'12px'}}>km</span></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div>
            <span className='bb' style={{padding:'2px'}}>Current pace</span>
          </div>
          <Grid container className='stats'>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>{cP.minutes}.{cP.seconds}</Grid>
            <Grid item xs={3}><span style={{fontSize:'12px'}}>min/km</span></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div>
            <span className='bb' style={{padding:'2px'}}>Average pace</span>
          </div>

          <Grid container className='stats'>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>{aP.minutes}.{aP.seconds}</Grid>
            <Grid item xs={3}><span style={{fontSize:'12px'}}>min/km</span></Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default Tracker;