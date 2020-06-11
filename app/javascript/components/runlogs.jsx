import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(){
    super()
    this.State = {
      time:0;
      distance:0;
    }
  }

  postrequest(){
    axios.post('/run_logs', {
      time: 10,
      distance: 100,
      user_id: 1,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        {this.state.time}
        {this.state.distance}
      </div>
    );
  }
}
export default App;