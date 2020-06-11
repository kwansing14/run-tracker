import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const React = require('react')
const ms = require('pretty-ms')

class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.saveTimer = this.saveTimer.bind(this)
  }
  startTimer() {
    this.props.liftStartTime()
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.props.liftStopTime()
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  saveTimer() {
    this.props.liftSaveTime(this.state.time)
    this.setState({time: 0, isOn: false})
  }
  saveDistance(){

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
      <div style={{marginTop:'100px'}}>
        <Grid container justify='center' className='numfont'style={{height:'26px'}}>
          {ms(this.state.time,{
            colonNotation: true,
            compact: true,
            keepDecimalsOnWholeSeconds: true,
            })}
        </Grid>
        <div className='timerbtn' style={{marginTop:'50px'}}>
          {start}
          {resume}
          {stop}
          {save}
        </div>
      </div>
    )
  }
}
export default Timer