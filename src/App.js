import React from 'react';
import './App.css';

let t = null;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      flag: null,
    }
  }
  
  changeMillisec = ()=>{
    if(this.state.milliseconds === 100 ){
      this.setState({
        milliseconds: 0,
        seconds: this.state.seconds + 1
      })
    }
    if(this.state.seconds === 60 ){
      this.setState({
        seconds: 0,
        minutes: this.state.minutes + 1
      })
    }
    this.setState({
      milliseconds: this.state.milliseconds + 1,   
    });
  }

  start = () => {
    if (!this.state.flag){
      this.setState({
        flag: true
      }, () => {
        t = setInterval(this.changeMillisec, 10)
      })
    }
        
  }
  stop = () => {
    this.setState({
      flag: false,
    }, ()=>{
      clearInterval(t);
    })
    
    
  }
  reset = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    }, ()=>{
      this.stop();
    })
    
  }

  renderTime = (time) => {
    if(time.toString().length === 1){
      return `0${time}`
    }else{
      return `${time}`
    }
  } 

  render(){

    const {minutes, seconds, milliseconds} = this.state;

    return (
      <div className='content'>
        <div className="title">
          <h1 className='title-text'>React Timer.</h1>
        </div>
        <div className='timer'>
          <h1 className='scoreboard'>{this.renderTime(minutes)}:{this.renderTime(seconds)}:{this.renderTime(milliseconds)}</h1>
          <div className="buttons">
            <button className='button' onClick={this.start}>start</button>
            <button className='button' onClick={this.stop}>stop</button>
            <button className='button' onClick={this.reset}>reset</button>
          </div>
        </div>
      </div>
    );
  }
}

