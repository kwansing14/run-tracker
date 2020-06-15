import React from 'react';
import axios from 'axios';
import moment from 'moment';

import { LineChart, Line, CartesianGrid, XAxis, YAxis ,Tooltip } from 'recharts';

class Chart extends React.Component {

  constructor(){
    super()
    this.state = {
      data2:'',
    }
  }

  componentDidMount(){
    const url = '/run_logs.json';
    axios.get(url)
      .then((response) => {
        console.log(response.data)
        console.log(response.data.length)
        this.setState({data2: response.data})
      }).catch((error)=>{
        console.log(error);
      })
    console.log('data2')
    console.log(this.state.data2);
  }

  render() {
    for(let i=0; i<this.state.data2.length; i++) {
      this.state.data2[i].id = i+1+'.';
    }
    console.log(this.state.data2);


  const renderLineChart = (
    <LineChart width={300} height={170} data={this.state.data2} style={{marginTop:'5px',transform:'translateX(-25px)'}}>
      <Line type="monotone" dataKey="pace" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
      <XAxis dataKey="id" />
      <YAxis />
    </LineChart>
  );

  const renderLineChart2 = (
    <LineChart width={300} height={170} data={this.state.data2} style={{marginTop:'5px',transform:'translateX(-25px)'}}>
      <Line type="monotone" dataKey="distance" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
      <XAxis dataKey="id" />
      <YAxis />
    </LineChart>
  );

  return (
      <div>
        <div className='bb' style={{textAlign:'center',fontSize:'20px',padding:'10px 0', margin:'10px 0',width:'98%'}}>
          Average pace
        </div>
        <div>
          Ave. Pace(min/km)
        <br/>
        </div>
        <div>
          {renderLineChart}
        </div>
        <div style={{textAlign:'center',transform:'translateY(-10px)'}}>Index</div>
        <div className='bb' style={{textAlign:'center',fontSize:'20px',padding:'10px 0', margin:'10px 0',width:'98%'}}>
          Distance
        </div>
        <div>
          Distance(km)
        <br/>
        </div>
        <div>
          {renderLineChart2}
        </div>
        <div style={{textAlign:'center',transform:'translateY(-10px)'}}>Index</div>
      </div>
    );
  }
}
export default Chart;