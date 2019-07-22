import React from 'react';
import './../assets/scss/product.scss';

export default class Product extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="product_wrapper">
        <div className="product_title">{this.props.I18n.getProductName(this.props.product)}</div>
        <div className="product_img_wrapper">
          <img src={this.props.product.image.url}/>
        </div>
      </div>
    );
  }
}