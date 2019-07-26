import React from 'react';
import BoostrapProgressBar from 'react-bootstrap/ProgressBar';
import './../assets/scss/timer.scss';

export default class Timer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="timer_wrapper">
        <BoostrapProgressBar striped variant="success" now={this.props.value} />
      </div>
    );
  }
}