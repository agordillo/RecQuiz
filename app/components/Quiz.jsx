import React from 'react';
import './../assets/scss/quiz.scss';

import QuizHeader from './QuizHeader.jsx';
import Timer from './Timer.jsx';
import ProductQuestion from './ProductQuestion.jsx';
import {updateQuestionIndex, updateTimer, selectDumpster, objectiveAccomplished, finishApp} from './../reducers/actions';
const timerRefreshMs = 200;
let timerInterval;
let timerConstant;

export default class Quiz extends React.Component {
  constructor(props){
    super(props);
    if(this.props.config.enable_timer === true){
      timerInterval = undefined;
      timerConstant = (timerRefreshMs/(10*this.props.config.timerseconds));
    }
    //Mark current product as shown
    let currentProduct = this.props.quiz.current_products[this.props.quiz.current_product_index - 1];
    this.props.LocalStorage.saveShowedProduct(currentProduct);
  }
  componentDidMount(){
    if(this.props.config.enable_timer === true){
      if((this.props.timer >= 0)&&(typeof this.props.quiz.selected_dumpster === "undefined")){
        this.startTimer();
      }
    }
  }
  componentWillUnmount(){
    this.stopTimer();
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.config.enable_timer === true){
      if((this.props.timer === 0)&&(prevProps.timer > 0)){
        setTimeout(function(){
          if(typeof this.props.quiz.selected_dumpster === "undefined"){
            this.props.Tracker.storeAction("TIME_RUNS_OUT");
            this.onAnswerQuestion(undefined);
          }
        }.bind(this),1000);
      } else if(this.props.timer === 100){
        setTimeout(function(){
          if(typeof this.props.quiz.selected_dumpster === "undefined"){
            this.startTimer();
          }
        }.bind(this),1000);
      }
    }
  }
  onDumpsterSelected(dumpster){
    if((typeof this.props.quiz.selected_dumpster !== "undefined")||((this.props.config.enable_timer === true)&&(this.props.timer===0))){
      return;
    }
    this.stopTimer();
    this.onAnswerQuestion(dumpster);
  }
  onAnswerQuestion(dumpster){
    this.stopTimer();

    let currentProduct = this.props.quiz.current_products[this.props.quiz.current_product_index - 1];
    let objective = this.props.tracking.objectives["Product" + (this.props.quiz.current_product_index)];

    // Calculate score
    let score = 0;
    if(dumpster === currentProduct.solution){
      //Correct
      score = objective.score;
    } else {
      //Incorrect (score=0)
      this.props.LocalStorage.saveIncorrectProduct(currentProduct);
    }

    // Mark question as answered
    this.props.dispatch(selectDumpster(dumpster));

    // Send data via SCORM
    this.props.dispatch(objectiveAccomplished(objective.id, score));
  }
  onNextQuestion(){
    let isLastQuestion = (this.props.quiz.current_product_index === this.props.quiz.current_products.length);
    if(isLastQuestion === false){
      this.props.dispatch(updateQuestionIndex(this.props.quiz.current_product_index + 1));
      //Mark next product as shown
      let nextProduct = this.props.quiz.current_products[this.props.quiz.current_product_index];
      this.props.LocalStorage.saveShowedProduct(nextProduct);
    } else {
      this.props.dispatch(finishApp(true));
    }
  }

  startTimer(){
    if(this.props.config.enable_timer !== true){
      return;
    }
    this.stopTimer();
    if(typeof timerInterval === "undefined"){
      timerInterval = setInterval(function(){
        if((this.props.timer > 0)&&(typeof this.props.quiz.selected_dumpster === "undefined")){
          //Timer enabled
          let newTimerValue = Math.max(0,this.props.timer - timerConstant);
          this.props.dispatch(updateTimer(newTimerValue));
        }
      }.bind(this),timerRefreshMs);
    }
  }

  stopTimer(){
    if(this.props.config.enable_timer !== true){
      return;
    }
    if(typeof timerInterval !== "undefined"){
      clearInterval(timerInterval);
      timerInterval = undefined;
    }
  }

  render(){
    let currentProduct = this.props.quiz.current_products[this.props.quiz.current_product_index - 1];
    let questionAnswered = ((typeof this.props.quiz.selected_dumpster!=="undefined")||((this.props.config.enable_timer === true)&&(this.props.timer===0)&&(typeof timerInterval === "undefined")));
    let onNextQuestion = this.onNextQuestion.bind(this);
    let onDumpsterSelected = this.onDumpsterSelected.bind(this);

    let quizHeader = "";
    if(this.props.quiz.current_products.length > 1){
      quizHeader = (<QuizHeader I18n={this.props.I18n} products={this.props.quiz.current_products} currentProductIndex={this.props.quiz.current_product_index}/>);
    }
    let productQuestion = "";
    if(typeof currentProduct === "object"){
       productQuestion=(<ProductQuestion onNextQuestion={onNextQuestion} onDumpsterSelected={onDumpsterSelected} quiz={this.props.quiz} dispatch={this.props.dispatch} I18n={this.props.I18n} answered={questionAnswered} quizCompleted={this.props.tracking.finished}/>)
    }
    let timerProgressBar = "";
    if((this.props.config.enable_timer === true)&&(typeof this.props.timer === "number")&&(this.props.timer >= 0)&&(this.props.timer <= 100)){
      timerProgressBar = (<Timer value={this.props.timer} />);
    }
    
    return (
      <div className="quiz">
        {quizHeader}
        {timerProgressBar}
        {productQuestion}
      </div>
    );
  }
}