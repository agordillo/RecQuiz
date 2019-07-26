import React from 'react';

export default class QuestionButtons extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let bTitle = "";
    let disable_next = (!this.props.answered || this.props.quizCompleted);
    if(disable_next){
      if(this.props.allow_finish){
        bTitle = this.props.I18n.getTrans("i.disabled_finish_title");
      } else {
        bTitle = this.props.I18n.getTrans("i.disabled_next_title");
      }
    }
    return (
      <div className="questionButtonsWrapper">
        <button className="nextQuestion btn-primary" onClick={this.props.onNextQuestion} disabled={disable_next} title={bTitle}>{this.props.allow_finish ? this.props.I18n.getTrans("i.finish_quiz") : this.props.I18n.getTrans("i.next")}</button>
      </div>
    );
  }
}