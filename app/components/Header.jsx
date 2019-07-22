import React from 'react';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="header_wrapper">
        <a target="_blank" href="https://github.com/agordillo/RecQuiz"><img src="assets/images/RecQuizLogo.png"/></a>
      </div>
    );
  }
}