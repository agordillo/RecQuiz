import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {selectDumpster, objectiveAccomplished} from './../reducers/actions';

import Product from './Product.jsx';
import Dumpster from './Dumpster.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class ProductQuestion extends React.Component {
  constructor(props){
    super(props);
  }
  onDumpsterSelected(dumpster){
    if(typeof this.props.quiz.selected_dumpster !== "undefined"){
      return;
    }

    // Calculate score
    let score = 0;
    if(dumpster === this.props.product.solution){
      //Correct
      score = this.props.objective.score;
    } {
      //Incorrect (score=0)
    }

    // Mark question as answered
    this.props.dispatch(selectDumpster(dumpster));

    // Send data via SCORM
    this.props.dispatch(objectiveAccomplished(this.props.objective.id, score));
  }
  onNextQuestion(){
    this.props.onNextQuestion();
  }
  render(){
    let dumpsters = [];
    for(let i = 0; i < this.props.product.dumpsters.length; i++){
      let dumpster = this.props.product.dumpsters[i];
      dumpsters.push(<Dumpster key={"Dumpster_" + i} dumpster={dumpster} onDumpsterSelected={this.onDumpsterSelected.bind(this)} questionAnswered={typeof this.props.quiz.selected_dumpster!=="undefined"} checked={this.props.quiz.selected_dumpster===dumpster} correct={this.props.product.solution===dumpster} />);
    }
    return (
      <div className="question">
        <Product I18n={this.props.I18n} product={this.props.product}/>
        <div className="dumpsters_wrapper">{dumpsters}</div>
        <QuestionButtons I18n={this.props.I18n} onNextQuestion={this.onNextQuestion.bind(this)} answered={typeof this.props.quiz.selected_dumpster !== "undefined"} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>
      </div>
    );
  }
}