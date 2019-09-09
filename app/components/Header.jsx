import React from 'react';
import {changeScreen} from './../reducers/actions';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }
  onClickLogo(){
    if(this.props.screen !== 1){
      this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : (this.props.tracking.started ? 1 : 0)));
    } else {
      //Do nothing
    }
  }
  onClickInfo(){
    if(this.props.screen !== 0){
      this.props.dispatch(changeScreen(0));
    } else {
      this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : (this.props.tracking.started ? 1 : 0)));
    }
  }
  onClickLearning(){
    if(this.props.screen !== 2){
      this.props.dispatch(changeScreen(2));
    } else {
      this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : (this.props.tracking.started ? 1 : 0)));
    }
  }
  onClickAbout(){
    if(this.props.config.mode === "LEARNING"){
      if(this.props.screen !== 4){
        this.props.dispatch(changeScreen(4));
      } else {
        this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : (this.props.tracking.started ? 1 : 0)));
      }
    } else {
      if (this.props.tracking.started && !this.props.tracking.finished){
        //Do nothing
      } else {
        if(this.props.screen !== 4){
          this.props.dispatch(changeScreen(4));
        } else {
          this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : (this.props.tracking.started ? 1 : 0)));
        }
      }
    }
  }
  render(){
    let instructionsIcon, learningIcon, aboutIcon = "";
    let aboutIconDisabled = (this.props.config.mode === "LEARNING") ? (this.props.screen === 4) : (this.props.tracking.started && !this.props.tracking.finished);
    if(this.props.config.mode === "LEARNING"){
      instructionsIcon = (<img onClick={this.onClickInfo.bind(this)} disabled={this.props.screen === 0} className={"headericon info" + ((this.props.screen === 0) ? " active" : "")} src="assets/images/info.png"/>);
      learningIcon = (<img onClick={this.onClickLearning.bind(this)} disabled={this.props.screen === 2} className={"headericon learning" + ((this.props.screen === 2) ? " active" : "")} src="assets/images/learning.png"/>);
    }
    aboutIcon = (<img onClick={this.onClickAbout.bind(this)} disabled={aboutIconDisabled} className={"headericon about" + ((this.props.screen === 4) ? " active" : "")} src="assets/images/about.png"/>);

    return (
      <div className="header_wrapper">
        <img onClick={this.onClickLogo.bind(this)} disabled={this.props.screen === 1} className="logo" src="assets/images/RecQuizLogo.png"/>
        {instructionsIcon}
        {learningIcon}
        {aboutIcon}
      </div>
    );
  }
}