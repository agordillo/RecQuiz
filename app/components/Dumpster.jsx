import React from 'react';

export default class Dumpster extends React.Component {
  constructor(props){
    super(props);
  }
  onDumpsterSelected(){
    this.props.onDumpsterSelected(this.props.dumpster);
  }
  getDumpsterImg(){
    switch(this.props.dumpster){
      case "yellow":
        return "assets/images/yellow_container.png";
      case "green":
        return "assets/images/green_cube.png";
      case "blue":
        return "assets/images/blue_container.png";
      case "brown":
        return "assets/images/brown_cube_short.png";
      case "gray":
        return "assets/images/gray_cube_short.png";
      case "sigre":
        return "assets/images/punto_sigre.png";
      case "facility":
        return "assets/images/punto_limpio.png";
    }
  }

  render(){
    let display = "style={display:none}";
    let wrapperClassName = ("dumpster_wrapper dumpster_wrapper_" + this.props.dumpster);
    let tickClassName = ("tick " + ((this.props.questionAnswered===true && this.props.correct===true) ? "" : "hidden"));
    let wrongTickClassName = ("wrong_tick " + ((this.props.checked===true && this.props.correct===false) ? "" : "hidden"));

    return (
      <div className={wrapperClassName}>
        <img src={this.getDumpsterImg()} title={this.props.I18n.getTrans("i.learn_" + this.props.dumpster + "_title")} className="dumpster" onClick={this.onDumpsterSelected.bind(this)} />
        <img src="assets/images/tick.png" className={tickClassName} />
        <img src="assets/images/wrong_tick.png" className={wrongTickClassName} />
      </div>
    );
  }
}