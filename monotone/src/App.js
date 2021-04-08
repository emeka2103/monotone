import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeInputValue: 100,
      isPlaying: false,
    };
    this.intervalId = null;
    this.handRangeInputChange = this.handRangeInputChange.bind(this);
    this.handleRangeIncrease = this.handleRangeIncrease.bind(this);
    this.handleRangeDecrease = this.handleRangeDecrease.bind(this);
    this.handleAudioControl = this.handleAudioControl.bind(this);
  }

  handRangeInputChange(event) {
    this.setState({ rangeInputValue: event.target.value });
    if (this.state.isPlaying) {
      clearInterval(this.intervalId);
      this.playBeat();
    }
  }

  handleRangeIncrease() {
    this.setState(function (prevState) {
      if (prevState.rangeInputValue < 100) {
        const newRangeInputValue = prevState.rangeInputValue + 5;
        const newState = { rangeInputValue: newRangeInputValue };
        return newState;
      } else {
        return prevState;
      }
    });
    if (this.state.isPlaying) {
      clearInterval(this.intervalId);
      this.playBeat();
    }
  }

  handleRangeDecrease() {
    this.setState(function (prevState) {
      if (prevState.rangeInputValue > 0) {
        const newRangeInputValue = prevState.rangeInputValue - 5;
        const newState = { rangeInputValue: newRangeInputValue };
        return newState;
      } else {
        return prevState;
      }
    });
    if (this.state.isPlaying) {
      clearInterval(this.intervalId);
      this.playBeat();
    }
  }

  playBeat() {
    const intervalInSecs = 60 / this.state.rangeInputValue;
    const intervalInMilliSecs = intervalInSecs * 1000;

    function soundPlayer() {
      const beat = new Audio("/clap.wav");
      beat.play();
    }

    this.intervalId = setInterval(soundPlayer, intervalInMilliSecs);
  }

  handleAudioControl() {
    if (this.state.isPlaying) {
      clearInterval(this.intervalId);
    } else {
      this.playBeat();
    }

    function updatePlaying(prevState) {
      const newisPlaying = !prevState.isPlaying;
      const newState = { isPlaying: newisPlaying };
      return newState;
    }
    this.setState(updatePlaying);
  }

  render() {
    return (
      <div className="App">
        <h1>MENTRONOME</h1>
        <div className="card">
          <h1>{this.state.rangeInputValue}BPM</h1>
          <div className="rangeContainer">
            <button onClick={this.handleRangeDecrease}>-</button>
            <input
              type="range"
              className="range"
              value={this.state.rangeInputValue}
              onChange={this.handRangeInputChange}
              s
            ></input>
            <button onClick={this.handleRangeIncrease}>+</button>
          </div>
          <button
            className="audioControlButton"
            onClick={this.handleAudioControl}
          >
            {this.state.isPlaying ? "pause" : "play"}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
