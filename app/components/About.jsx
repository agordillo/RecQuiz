import React from 'react';
import './../assets/scss/about.scss';

export default class About extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let products = [];
    for(let i=0; i<this.props.products.length; i++){
      let product = this.props.products[i];
      if((typeof product.image === "object")&&(typeof product.image.license === "object")&&(typeof product.image.license.attribution === "string")){
        products.push(<li key={"key_"+i}>{product.image.license.attribution}</li>);
      }
    }
    return (
      <div className="about_wrapper">
        <div dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.about_1")}}/>
        <div dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.about_2")}}/>
        <div className="license_attributions" dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.about_3")}}/>
        <ul className="license_attributions">{products}</ul>
        <div dangerouslySetInnerHTML={{ __html:  this.props.I18n.getTrans("i.data_consent")}}/>
      </div>
    );
  }
}