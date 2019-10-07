import React from 'react';
import Dumpster from './Dumpster.jsx';
import './../assets/scss/learning.scss';

export default class Learning extends React.Component {
  constructor(props){
    super(props);
    this.state = {selected_dumpster: "yellow"};
  }
  onDumpsterSelected(dumpster){
    this.setState({selected_dumpster: dumpster});
  }
  render(){
    let dumpsters = ["yellow","green","blue","brown","gray","sigre","facility"].map(function(dumpsterKey){
      return (<Dumpster key={dumpsterKey} dumpster={dumpsterKey} onDumpsterSelected={this.onDumpsterSelected.bind(this)} correct={this.state.selected_dumpster===dumpsterKey} questionAnswered={true} checked={false} />);
    }.bind(this));

    return (
      <div className="learning_wrapper">
        <p>{this.props.I18n.getTrans("i.learn_main")}</p>
        <div className="dumpsters_wrapper">{dumpsters}</div>
          <div className="dumpster_info_wrapper">
            <p className="dumpster_info_title">{this.props.I18n.getTrans("i.learn_" + this.state.selected_dumpster + "_title")}</p>
            <div className="dumpster_info_description" dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.learn_" + this.state.selected_dumpster)}}/>
          </div>
      </div>
    );
  }
}


