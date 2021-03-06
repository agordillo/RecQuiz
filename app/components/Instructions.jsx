import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {changeScreen} from './../reducers/actions';

import './../assets/scss/instructions.scss';

export default class Instructions extends React.Component {
  constructor(props){
    super(props);
    this.state = {instructionsCheckbox: (this.props.LocalStorage.getSetting("skip_instructions")===true ? true : false)};
    this.handleInstructionsCheckox = this.handleInstructionsCheckox.bind(this);
  }
  componentDidMount(){
  }
  handleInstructionsCheckox(){
    this.setState({instructionsCheckbox: !this.state.instructionsCheckbox});
  }
  onClick(){
    if(this.state.instructionsCheckbox===true){
      this.props.LocalStorage.saveSetting("skip_instructions",true);
    }
    this.props.dispatch(changeScreen(this.props.tracking.finished ? 3 : 1));
  }
  render(){
    //Instructions 5 should be shown only for mode "LEARNING"
    let i2, i5, i6, i7 = "";
    if(this.props.config.enable_timer === true){
      i2 = (<li>{this.props.I18n.getTrans("i.instructions_2_timer")}</li>);
    } else {
      i2 = (<li>{this.props.I18n.getTrans("i.instructions_2")}</li>);
    }
    if(this.props.config.mode === "LEARNING"){
      i5 = (<li><div dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.instructions_5")}}/></li>);
      i6 = (<li><div dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.instructions_6")}}/></li>);
      i7 = (<li><div dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.instructions_7")}}/></li>);
    }
    return (
      <Jumbotron fluid className="instructions_wrapper">
        <Container>
          <h1>{this.props.I18n.getTrans("i.instructions_title")}</h1>
          <ul>
            <li>{this.props.I18n.getTrans("i.instructions_1")}</li>
            {i2}
            <li>{this.props.I18n.getTrans("i.instructions_3")}</li>
            <li><div dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.instructions_4")}}/></li>
            {i5}
            {i6}
            {i7}
          </ul>
          <div className="instructions_checkbox">
            <ul><li><input type="checkbox" onChange={this.handleInstructionsCheckox} checked={this.state.instructionsCheckbox}/><span>{this.props.I18n.getTrans("i.instructions_checkbox")}</span></li></ul>
          </div>
          <Button variant="primary" onClick={this.onClick.bind(this)}>{this.props.I18n.getTrans("i.instructions_button_ok")}</Button>
        </Container>
      </Jumbotron>

    );
  }
}