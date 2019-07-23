import React from 'react';

export default class QuestionButtons extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let disable_next = (!this.props.answered || this.props.quizCompleted);
    return (
      <div className="questionButtonsWrapper">
        <button className="nextQuestion btn-primary" onClick={this.props.onNextQuestion} disabled={disable_next}>{this.props.allow_finish ? this.props.I18n.getTrans("i.finish_quiz") : this.props.I18n.getTrans("i.next")}</button>
      </div>
    );
  }
}