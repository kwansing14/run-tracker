import React from 'react';
import Grid from '@material-ui/core/Grid';

let watchID = null;
let counter = 0;

class Tracker extends React.Component {

  constructor(){
    super()
    this.state = {
      lat: [],
      long: [],
      distance:100,
      templat:'',
      templong:'',
      counter:0,
    }
  }

  calc(event){
    debugger
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
        counter++;
        this.setState ({
          distance:dist,
          counter:counter,
        })
        console.log("distance check done")
        //return dist;
    }
  }

  // to get update location
  showLocation(position) {
    console.log("watching......")
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
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
    // this.setState({
    //   lat:[latitude, ...this.state.lat],
    //   long:[longitude, ...this.state.long]
    // })
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
    if(navigator.geolocation){
      // timeout at 60000 milliseconds (60 seconds)
      var options = {
        timeout:Infinity,
        enableHighAccuracy: true};
      let geoLoc = navigator.geolocation;
      watchID = geoLoc.watchPosition(
        (position)=>{this.showLocation(position)},
        (err)=>{this.errorHandler(err)},
        options)
    } else {
      alert("Sorry, browser does not support geolocation!");
    }
  }

  stop(event){
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

  putSaveTime(){
    this.stop()
    this.props.liftSaveDistance(this.state.distance)
    this.setState({
      distance:0,
    })
  }

    render() {
      let Lat = this.state.lat.map((elem)=> {
        return(
          <div>{elem}</div>)
        })
      let Long = this.state.long.map((elem)=>{
        return(
          <div>{elem}</div>)
      })
    return (
      <div>
          For testing purpose:<br/>
          lat1: &nbsp;<input id='lat1'></input><br/>
          long1:<input id='lon1'></input><br/>
          lat2: &nbsp;<input id='lat2'></input><br/>
          long2:<input id='lon2'></input>
        <br/>
        <Grid container justify='center'>
          <button onClick={(event)=>{this.calc(event)}}>submit</button>
          <button onClick={(event)=>{this.updateloc(event)}}>updateloc</button>
          <button onClick={(event)=>{this.stop(event)}}>stop</button>
        </Grid>
        <div>
          lat: {Lat}
        </div>
        <div>
          long: {Long}
        </div>
        <div>
          counter: {this.state.counter}
        </div>
        <div>
          distance: {this.state.distance}
        </div>
      </div>
    );
  }
}
export default Tracker;