import React from 'react';

export default class QuizHeader extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="quizHeader">
        <p>{this.props.I18n.getTrans("i.quiz_header_title", {current:this.props.currentProductIndex, total:this.props.products.length})}</p>
      </div>
    );
  }
}