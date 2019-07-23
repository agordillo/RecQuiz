import React from 'react';
import {changeScreen} from './../reducers/actions';

export default class Learning extends React.Component {
  constructor(props){
    super(props);
  }
  onClickLearning(){
    this.props.dispatch(changeScreen(1));
  }
  render(){
    return (
      <div className="learning_wrapper">
        <p>Learning page</p>
      </div>
    );
  }
}