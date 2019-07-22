import React from 'react';
import $ from 'jquery';
import './../assets/scss/quiz.scss';

import * as Utils from '../vendors/Utils.js';
import {addObjectives, resetObjectives, finishApp} from './../reducers/actions';

import QuizHeader from './QuizHeader.jsx';
import ProductQuestion from './ProductQuestion.jsx';

export default class Quiz extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      all_products: [],
      current_products: [],
      current_product_index: 1
    };
  }
  componentDidMount(){
    $.getJSON(this.props.config.products, function(data) {
        if((data.products instanceof Array)&&(data.products.length > 0)){
          //Products retrieved
          this.afterRetrieveProducts(data.products);
        }
    }.bind(this));
  }

  afterRetrieveProducts(products){
    //Save products
    this.setState({all_products:products});

    //Create questions (i.e. current products)
    let nProducts = products.length;

    //Shuffle products
    products = Utils.shuffleArray(products);

    // If adaptive behaviour enabled: try to sort products based on difficulty
    let products_sorted = false;
    if(this.props.config.adaptive === true){
      let difficulty = this.getUserDifficulty();
      if(typeof difficulty !== "undefined"){
        products = this.sortProductsByDifficulty(products,difficulty);
        products_sorted = true;
      }
    }

    //Limit number of products if n > available products
    if((typeof this.props.config.n === "number")&&(this.props.config.n >= 1)&&(this.props.config.n < nProducts)){
      products = products.slice(0, Math.min(this.props.config.n, nProducts));
      nProducts = products.length;
    }

    //Establish choices (i.e. dumpsters for products)
    for(let i = 0; i < nProducts; i++){
      products[i].dumpsters = ["yellow","green","blue","brown","gray","sigre","facility"];
    }

    this.setState({current_products:products});

    // Create objectives (one per question/product included in the quiz)
    let objectives = [];
    for(let i = 0; i < nProducts; i++){
      objectives.push(new Utils.Objective({id:("Product" + (i + 1)), progress_measure:(1 / nProducts), score:(1 / nProducts)}));
    }
    this.props.dispatch(addObjectives(objectives));
  }

  sortProductsByDifficulty(products,difficulty){
    if((typeof difficulty === "number")&&(difficulty >=1)&&(difficulty <= 10)){
      for(let i = 0; i < products.length; i++){
        if((typeof products[i].difficulty !== "number") || (products[i].difficulty < 1) || (products[i].difficulty > 10)){
          products[i].difficulty = 5;
        }
        products[i].suitability = (10 - Math.abs((products[i].difficulty - difficulty))) / 10;
      }
      products.sort(function(a, b){ return b.suitability - a.suitability; });
      return products;
    }
  }

  getUserDifficulty(){
    //Difficulty provided by the environment
    if((typeof this.props.user_profile === "object") && (typeof this.props.user_profile.learner_preference === "object") && (typeof this.props.user_profile.learner_preference.difficulty === "number")&&(this.props.user_profile.learner_preference.difficulty >= 1 && this.props.user_profile.learner_preference.difficulty <= 10)){
      return this.props.user_profile.learner_preference.difficulty;
    }
    //Difficulty locally stored
    let storedDifficulty = this.props.LocalStorage.getSetting("difficulty");
    if((typeof storedDifficulty === "number")&&(storedDifficulty >= 1 && storedDifficulty <= 10)){
      return storedDifficulty;
    } else {
      return undefined;
    }
  }

  onNextQuestion(){
    let isLastQuestion = (this.state.current_product_index === this.state.current_products.length);
    if(isLastQuestion === false){
      this.setState({current_product_index:(this.state.current_product_index + 1)});
    } else {
      this.props.dispatch(finishApp(true));
    }
  }

  onResetQuiz(){
    this.setState({current_product_index:Math.max(1,this.state.current_products.length)});
    this.props.dispatch(resetObjectives());
  }

  render(){
    let currentProduct = this.state.current_products[this.state.current_product_index - 1];
    let isLastQuestion = (this.state.current_product_index === this.state.current_products.length);
    let objective = this.props.tracking.objectives["Product" + (this.state.current_product_index)];
    let onNextQuestion = this.onNextQuestion.bind(this);
    let onResetQuiz = this.onResetQuiz.bind(this);

    let quizHeader = "";
    if(typeof this.state.current_products.length > 0){
      quizHeader = (<QuizHeader I18n={this.props.I18n} products={this.state.current_products} currentProductIndex={this.state.current_product_index}/>);
    }
    let productQuestion = "";
    if(typeof currentProduct === "object"){
       productQuestion=(<ProductQuestion product={currentProduct} dispatch={this.props.dispatch} I18n={this.props.I18n} objective={objective} onNextQuestion={onNextQuestion} onResetQuiz={onResetQuiz} isLastQuestion={isLastQuestion} quizCompleted={this.props.tracking.finished}/>)
    }

    return (
      <div className="quiz">
        {quizHeader}
        {productQuestion}
      </div>
    );
  }
}