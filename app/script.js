import React from 'react';
import { render } from 'react-dom';

class AppDescription extends React.Component {
  render() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
  }
};

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
    };

    this.startTimer = this.startTimer.bind(this);
    this.step = this.step.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.closeApp = this.closeApp.bind(this);
    this.playBell = this.playBell.bind(this);
  }

  formatTime(time){
    const seconds = String(Math.floor(time%60)).padStart(2, '0');
    const minutes = String(Math.floor((time/60)%60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  startTimer(){
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    })
  }

  step(){
    this.setState({
      time: this.state.time - 1,
    })

    if(this.state.time === 0){
      this.playBell();
      if(this.state.status === 'work'){
        this.setState({
          status: 'rest',
          time: 20,
        })
      } else if(this.state.status === 'rest'){
        this.setState({
          status: 'work',
          time: 1200,
        })
      }
    }
  }

  stopTimer(){
    clearInterval(this.state.timer);
    this.setState({
      status: 'off',
      time: 0,
    })
  }

  closeApp(){
    window.close();
  }

  playBell(){
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === 'off' && <AppDescription />}
        {this.state.status === 'work' && <img src="./images/work.png" />}
        {this.state.status === 'rest' && <img src="./images/rest.png" />}
        {this.state.status !== 'off' && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {this.state.status === 'off' && <button className="btn" onClick={this.startTimer}>Start</button>}
        {this.state.status !== 'off' && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
