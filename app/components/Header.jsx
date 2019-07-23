import React from 'react';
import {changeScreen} from './../reducers/actions';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }
  onClickLogo(){
    if(this.props.screen !== 1){
      this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : 1));
    } else {
      //Do nothing
    }
  }
  onClickInfo(){
    if(this.props.screen !== 0){
      this.props.dispatch(changeScreen(0));
    } else {

      this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : 1));
    }
  }
  onClickLearning(){
    if(this.props.screen !== 2){
      this.props.dispatch(changeScreen(2));
    } else {
      this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : 1));
    }
  }
  render(){
    let instructionsIcon, learningIcon = "";
    if(this.props.config.mode === "LEARNING"){
      instructionsIcon = (<img onClick={this.onClickInfo.bind(this)} disabled={this.props.screen === 0} className="headericon info" src="assets/images/info.png"/>);
      learningIcon = (<img onClick={this.onClickLearning.bind(this)}  disabled={this.props.screen === 2} className="headericon learning" src="assets/images/learning.png"/>);
    }

    return (
      <div className="header_wrapper">
        <img onClick={this.onClickLogo.bind(this)} disabled={this.props.screen === 1} className="logo" src="assets/images/RecQuizLogo.png"/>
        {instructionsIcon}
        {learningIcon}
      </div>
    );
  }
}