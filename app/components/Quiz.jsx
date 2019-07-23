import React from 'react';
import './../assets/scss/quiz.scss';

import QuizHeader from './QuizHeader.jsx';
import ProductQuestion from './ProductQuestion.jsx';

import {updateQuestionIndex, finishApp} from './../reducers/actions';

export default class Quiz extends React.Component {
  constructor(props){
    super(props);
  }

  onNextQuestion(){
    let isLastQuestion = (this.props.quiz.current_product_index === this.props.quiz.current_products.length);
    if(isLastQuestion === false){
      this.props.dispatch(updateQuestionIndex(this.props.quiz.current_product_index + 1));
    } else {
      this.props.dispatch(finishApp(true));
    }
  }

  render(){
    let currentProduct = this.props.quiz.current_products[this.props.quiz.current_product_index - 1];
    let isLastQuestion = (this.props.quiz.current_product_index === this.props.quiz.current_products.length);
    let objective = this.props.tracking.objectives["Product" + (this.props.quiz.current_product_index)];
    let onNextQuestion = this.onNextQuestion.bind(this);

    let quizHeader = "";
    if(typeof this.props.quiz.current_products.length > 0){
      quizHeader = (<QuizHeader I18n={this.props.I18n} products={this.props.quiz.current_products} currentProductIndex={this.props.quiz.current_product_index}/>);
    }
    let productQuestion = "";
    if(typeof currentProduct === "object"){
       productQuestion=(<ProductQuestion quiz={this.props.quiz} product={currentProduct} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished}/>)
    }

    return (
      <div className="quiz">
        {quizHeader}
        {productQuestion}
      </div>
    );
  }
}