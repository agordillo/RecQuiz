import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as LocalStorage from '../vendors/Storage.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Instructions from './Instructions.jsx';
import Quiz from './Quiz.jsx';

export class App extends React.Component {
  constructor(props){
    super(props);
    LocalStorage.init();
    I18n.init();
  }
  render(){
    let appHeader = (
      <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
    );
    let appContent = "";

    if(this.props.wait_for_user_profile !== true){
      
      let screen = this.props.screen;
      if(screen===0){
        if((GLOBAL_CONFIG.skip_insctructions===true)||(LocalStorage.getSetting("skip_instructions")===true)){
          screen=1;
        }
      }

      switch(screen){
        case 0:
          //Instructions
          appContent = (
            <Instructions dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG} I18n={I18n}/>
          );
          break;
        case 1:
          //Quiz
          appContent = (
            <Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG} I18n={I18n} LocalStorage={LocalStorage}/>
          );
          break;
        case 2:
          //Learning
          break;
        case 3:
          //Finish screen
          appContent = (
            <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG} I18n={I18n}/>
          );
          break;
        default:
          //Default
      }
    }

    return (
      <div id="container">
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        {appHeader}
        {appContent}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);