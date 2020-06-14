import React from 'react';
import axios from 'axios';
import ms from 'pretty-ms';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

class Runlogs extends React.Component {

  constructor(){
    super()
    this.state={
      logs:[],
      temp:[],
      pace:0,
    }
  }

  componentDidMount(){
    console.log("DID MOUNT")
    const url = '/run_logs.json';
    axios.get(url)
      .then((response) => {
        this.setState({ logs: response.data })
      }).catch((error)=>{
        console.log(error);
      })
  }

  //axios save and post each run logs
  postrequest = async(object) => {
    let res = await axios.post('/run_logs.json', object)
    this.componentDidMount();
  }

  //axios deleting each logs
  delbtn = async(event) =>{
    let res = await axios.delete("/run_logs/"+event.currentTarget.id+".json")
    this.componentDidMount();
  }

  render() {
    console.log("refresh logs")
    let logs;
    if(this.state.logs != undefined) {
      logs = this.state.logs.map((log, index)=>{
        return (
          <span key={log.id}>
            <ListItem disableRipple button style={{width:'100%'}}>
              <Grid item xs={2}>{index+1}.
              </Grid>
              <Grid item xs={9}>
                <div>time: {ms(log.time)}</div>
                <div>distance: {(log.distance).toFixed(2)}Km</div>
              </Grid>
              <Grid item xs={1} container justify='flex-end'>
                <Button style={{minWidth: '30px'}}id={log.id} onClick={(event)=>{this.delbtn(event)}}><CloseIcon fontSize="small" /></Button>
              </Grid>
            </ListItem>
            <Divider/>
          </span>
          );
      });
    }

    return (
      <div>
        <div className='bb' style={{textAlign:'center',fontSize:'20px',padding:'10px', margin:'10px 2px'}}>Running Logs</div>
        {logs}
      </div>
    );
  }
}
export default Runlogs;