import React from 'react';
import Product from './Product.jsx';
import Dumpster from './Dumpster.jsx';
import QuestionButtons from './QuestionButtons.jsx';

export default class ProductQuestion extends React.Component {
  constructor(props){
    super(props);
  }
  onDumpsterSelected(dumpster){
    this.props.onDumpsterSelected(dumpster);
  }
  render(){
    let product = this.props.quiz.current_products[this.props.quiz.current_product_index - 1];
    let isLastQuestion = (this.props.quiz.current_product_index === this.props.quiz.current_products.length);

    let dumpsters = [];
    for(let i = 0; i < product.dumpsters.length; i++){
      let dumpster = product.dumpsters[i];
      dumpsters.push(<Dumpster key={"Dumpster_" + i} dumpster={dumpster} onDumpsterSelected={this.onDumpsterSelected.bind(this)} questionAnswered={this.props.answered} checked={this.props.quiz.selected_dumpster===dumpster} correct={product.solution===dumpster} />);
    }
    return (
      <div className="question">
        <Product I18n={this.props.I18n} product={product}/>
        <div className="dumpsters_wrapper">{dumpsters}</div>
        <QuestionButtons I18n={this.props.I18n} onNextQuestion={this.props.onNextQuestion} answered={this.props.answered} quizCompleted={this.props.quizCompleted} allow_finish={this.props.isLastQuestion}/>
      </div>
    );
  }
}