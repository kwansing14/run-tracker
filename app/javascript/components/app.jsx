import React, { Component } from 'react';
import Timer from './timer';
import Tracker from './tracker';
import Startbtn from './startbtn';
import Runlogs from './runlogs';
import Chart from './chart';
import { Tab, Tabs, TabList, Panel, PanelList } from "react-swipeable-tab";

//material UI stuff
import {Grid, Button} from '@material-ui/core';
import style from './style';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      time:0,
      distance:0,
      value:0,
      tab1_activeIndex: 0,
    }
  }

  //define object
  liftSaveTime(v){
    console.log('time is'+v)
    let object = {
      time:v,
      distance:0,
      pace:0,
      currentPace:[],
    }
    this.refs.putTracker.putSaveTime(object);
    this.setState({
      time:v
    })
  }
  liftStartTime(){
    console.log("starttttttt..")
    this.refs.putTracker.putStartTime();
  }
  liftStopTime(){
    this.refs.putTracker.putStopTime();
  }

  liftSaveObject(object){
    this.refs.putrunlogs.postrequest(object);
  }
  liftpacer(v){
    this.refs.putTracker.putpacer(v)
  }

  liftSaveTimerbtn(){
    this.refs.putTimer.saveTimer()
  }
  liftStartTimerbtn(){
    this.refs.putTimer.startTimer()
  }
  liftStopTimerbtn(){
    this.refs.putTimer.stopTimer()
  }
  click(){
    //this.refs.chart.componentDidMount()
  }
  onTab1_Change = index => {
    this.setState({
      tab1_activeIndex: index
    });
    if(index==2){
      this.click()
      this.refs.chart.componentDidMount()
    }
  };

  render() {
    console.log('this.state.time')
    console.log(this.state.time)
    console.log('this.state.distance')
    console.log(this.state.distance)

    const { tab1_activeIndex } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} container justify='center'>
          <Tabs panelIscroll={false} inkColor={'#000'} inkWidth={'100%'} activeIndex={tab1_activeIndex} onTabChange={this.onTab1_Change} style={{width:'300px'}}>
            <TabList style={{ height: "40px" }}>
              <Tab><Button style={{width:'100%'}}>Activity</Button></Tab>
              <Tab><Button style={{width:'100%'}}>Logs</Button></Tab>
              <Tab><Button style={{width:'100%'}}>Stats</Button></Tab>
            </TabList>
            <PanelList style={{height:'600px'}}>
              <Panel id='panel1'>
                <Grid container spacing={2}>
                  <Grid item xs={12} container justify='center'>
                    <Timer
                      ref='putTimer'
                      liftStartTime={()=>{this.liftStartTime()}}
                      liftStopTime={()=>{this.liftStopTime()}}
                      liftSaveTime={(v)=>{this.liftSaveTime(v)}}
                      liftpacer={(v)=>{this.liftpacer(v)}}/>
                  </Grid>
                  <Grid item xs={12} container justify='center'>
                    <Tracker
                      ref='putTracker'
                      liftSaveObject={(v)=>{this.liftSaveObject(v)}}/>
                  </Grid>
                  <Grid item xs={12} container justify='center'>
                    <Startbtn
                      liftStartTimer={()=>{this.liftStartTimerbtn()}}
                      liftStopTimer={()=>{this.liftStopTimerbtn()}}
                      liftSaveTimer={()=>{this.liftSaveTimerbtn()}}/>
                  </Grid>
                </Grid>
              </Panel>
              <Panel id='panel2' style={{overflow:'scroll'}}>
                <Runlogs ref='putrunlogs'/>
              </Panel>
              <Panel id='panel3'>
                <Chart ref='chart'/>
              </Panel>
            </PanelList>
          </Tabs>
        </Grid>
      </Grid>
    );
  }
}

export default App;