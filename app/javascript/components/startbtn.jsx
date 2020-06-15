import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//const React = require('react')
//const ms = require('pretty-ms')

class startBtn extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOn: false,
      start: 0,
      time:0,
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.saveTimer = this.saveTimer.bind(this)
  }
  startTimer() {
    console.log('start')
    this.props.liftStartTimer()
    this.setState({
        isOn: true,
        time: 1,})
  }
  stopTimer() {
    console.log('stop')
    this.props.liftStopTimer()
    this.setState({isOn: false})
  }
  saveTimer() {
    console.log('save')
    this.props.liftSaveTimer()
    this.setState({
        isOn: false,
        time: 0,})
  }
  render() {
    let start = (this.state.time == 0) ?
      <Button style={{border:'1px solid black', borderRadius:'40px', width:'250px', maxWidth:'250px'}} onClick={()=>{this.startTimer()}}>start</Button> :
      null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <Button style={{border:'1px solid black', borderRadius:'40px', width:'250px', maxWidth:'250px'}} onClick={this.stopTimer}>stop</Button>
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <Button style={{border:'1px solid black', borderRadius:'40px', width:'120px', marginRight:'3px', maxWidth:'200px'}} onClick={this.startTimer}>resume</Button>
    let save = (this.state.time == 0 || this.state.isOn) ?
      null :
      <Button style={{border:'1px solid black', borderRadius:'40px', width:'120px', marginLeft:'3px', maxWidth:'200px'}} onClick={this.saveTimer}>save</Button>
    return(
        <div className='timerbtn'>
          {start}
          {resume}
          {stop}
          {save}
        </div>
    )
  }
}
export default startBtn;