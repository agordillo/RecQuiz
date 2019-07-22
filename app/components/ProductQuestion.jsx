import React from 'react';

import * as Utils from '../vendors/Utils.js';
import {objectiveAccomplished} from './../reducers/actions';

import Product from './Product.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class ProductQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choice:undefined,
      answered:false,
    };
  }
  componentWillUpdate(prevProps, prevState){
    if(prevProps.product !== this.props.product){
      this.setState({selected_choice:undefined, answered:false});
    }
  }
  handleChoiceChange(choice){
    this.setState({selected_choice:choice});
  }
  onAnswerQuestion(){
    // Calculate score
    let score = 0;
    if(this.state.selected_choice === this.product.solution){
      //Correct
      score = this.props.objective.score;
    } {
      //Incorrect (score=0)
    }

    // Send data via SCORM
    this.props.dispatch(objectiveAccomplished(objective.id, score));

    // Mark question as answered
    this.setState({answered:true});
  }
  onResetQuestion(){
    this.setState({selected_choice:undefined, answered:false});
  }
  onNextQuestion(){
    this.props.onNextQuestion();
  }
  render(){
    // let choices = [];
    // for(let i = 0; i < this.props.question.choices.length; i++){
    //   choices.push(<MCQuestionChoice key={"MyQuestion_" + "question_choice_" + i} choice={this.props.question.choices[i]} checked={this.state.selected_choices_ids.indexOf(this.props.question.choices[i].id) !== -1} handleChange={this.handleChoiceChange.bind(this)} questionAnswered={this.state.answered}/>);
    // }
    let choices = "";
    return (
      <div className="question">
        <Product I18n={this.props.I18n} product={this.props.product}/>
        {choices}
        <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuestion.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.props.onResetQuiz} onNextQuestion={this.onNextQuestion.bind(this)} answered={this.state.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>
      </div>
    );
  }
}