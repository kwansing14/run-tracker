import React from 'react';
import axios from 'axios';
import moment from 'moment';
import ms from 'parse-ms';

import { LineChart, Line, CartesianGrid, XAxis, YAxis ,Tooltip } from 'recharts';

class Chart extends React.Component {

  constructor(){
    super()
    this.state = {
      data2:'',
      data3:'',
    }
  }

  componentDidMount(v){
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

    axios.get('/pacings.json',{
      params: {
        run_log_id: v,
      }
    })
      .then((response) => {
        console.log(response.data)
        console.log(response.data.length)
        this.setState({data3: response.data})
      }).catch((error)=>{
        console.log(error);
      })
    console.log('data3')
    console.log(this.state.data3);
  }

  render() {
    for(let i=0; i<this.state.data2.length; i++) {
      this.state.data2[i].id = i+1+'.';
    }

    for(let i=0; i<this.state.data3.length; i++) {
      this.state.data3[i].id = (i+1)*0.5;

      let cP = ms(parseInt(this.state.data3[i].body))
      if (cP.seconds.length == 1) {
        cP.seconds = "0"+cP.seconds
      }
      this.state.data3[i].body = cP.minutes+"."+cP.seconds
    }



    const renderLineChart = (
      <LineChart width={300} height={170} data={this.state.data2} style={{marginTop:'5px',transform:'translateX(-15px)'}}>
        <Line type="monotone" dataKey="pace" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <XAxis dataKey="id" />
        <YAxis />
      </LineChart>
    );

    const renderLineChart2 = (
      <LineChart width={300} height={170} data={this.state.data2} style={{marginTop:'5px',transform:'translateX(-15px)'}}>
        <Line type="monotone" dataKey="distance" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <XAxis dataKey="id" />
        <YAxis />
      </LineChart>
    );

    const renderLineChart3 = (
      <LineChart width={300} height={170} data={this.state.data3} style={{marginTop:'5px',transform:'translateX(-15px)'}}>
        <Line type="monotone" dataKey="body" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <XAxis dataKey="id" />
        <YAxis />
      </LineChart>
    );

    return (
      <div style={{maxHeight:'600px', overflow:'scroll'}}>
        {/* Single run table*/}
        <div className='bb' style={{textAlign:'center',fontSize:'20px',padding:'10px 0', margin:'10px 0',width:'98%'}}>
          Average pace for 1 run
        </div>
        <div>
          Ave. Pace(min/km)
        <br/>
        </div>
        <div>
          {renderLineChart3}
        </div>
        <div style={{textAlign:'center',transform:'translateY(-10px)'}}>
          Minutes
        </div>

        {/* Average pace table*/}
        <div className='bb' style={{textAlign:'center',fontSize:'20px',padding:'10px 0', margin:'10px 0',width:'98%'}}>
          Overall average pace
        </div>
        <div>
          Ave. Pace(min/km)
        <br/>
        </div>
        <div>
          {renderLineChart}
        </div>
        <div style={{textAlign:'center',transform:'translateY(-10px)'}}>Index</div>

        {/* Distance table*/}
        <div className='bb' style={{textAlign:'center',fontSize:'20px',padding:'10px 0', margin:'10px 0',width:'98%'}}>
          Overall distance
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