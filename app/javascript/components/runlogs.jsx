import React from 'react';
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';

class Runlogs extends React.Component {

  constructor(){
    super()
    this.state={
      logs:[],
      temp:[],
    }
  }

  componentDidMount(){
    console.log("DID MOUNT")
    const url = '/run_logs.json';
    axios.get(url)
      .then((response) => {
        const data = response.data
        this.setState({ logs: data })
      }).catch((error)=>{
        console.log(error);
      })
  }

  // postrequest(object){
  //   axios.post('/run_logs.json', object)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // }

  postrequest = async(object) => {
    let res = await axios.post('/run_logs.json', object)
    this.componentDidMount();
  }

  delbtn = async() =>{
    console.log('deleting.')
    console.log(event.target.value)
    let res = await axios.delete("/run_logs/"+event.target.value+".json")
    this.componentDidMount();
  }

  render() {
    console.log("refresh logs")
    let logs;
    if(this.state.logs != undefined) {
      logs = this.state.logs.map((log, index)=>{
        return (
          <div key={log.id}>
            <div>time: {log.time}</div>
            <div>distance: {log.distance}</div>
            <button  value={log.id} onClick={()=>{this.delbtn()}}>del</button>
          </div>);
      });
    }

    return (
      <div>
        hello world
        {logs}
      </div>
    );
  }
}
export default Runlogs;