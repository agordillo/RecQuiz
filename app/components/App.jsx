import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import './../assets/scss/main.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as LocalStorage from '../vendors/Storage.js';
import * as I18n from '../vendors/I18n.js';
import * as Utils from '../vendors/Utils.js';
import * as SAMPLES from '../config/samples.js';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
import Instructions from './Instructions.jsx';
import Quiz from './Quiz.jsx';
import Learning from './Learning.jsx';
import About from './About.jsx';

import {updateQuiz,addObjectives,changeScreen} from './../reducers/actions';

export class App extends React.Component {
  constructor(props){
    super(props);
    LocalStorage.init();
    I18n.init();
    if(typeof LocalStorage.getSetting("deviceid") === "undefined"){
      LocalStorage.saveSetting("deviceid",Math.random().toString(36).substr(2, 13));
    }
    let screen = this.props.screen;
    let showInstructions = !((GLOBAL_CONFIG.skip_instructions===true)||(LocalStorage.getSetting("skip_instructions")===true));
    if((screen===0)&&(showInstructions===false)&&(this.props.tracking.started===false)){
      this.props.dispatch(changeScreen(1));
    }
  }

  componentDidMount(){
    $.getJSON(GLOBAL_CONFIG.products, function(data) {
        if((data.products instanceof Array)&&(data.products.length > 0)){
          //Products retrieved
          this.afterRetrieveProducts(data.products);
        }
    }.bind(this));
  }

  afterRetrieveProducts(products){
    //Create quiz object
    let quiz = {};

    //Save all products
    quiz.all_products = JSON.parse(JSON.stringify(products));

    //Shuffle products
    products = Utils.shuffleArray(products);

    //Create questions (i.e. current products)
    let nProducts = products.length;

    //Specify maximum number of products to be shown
    let n = undefined;
    if((typeof GLOBAL_CONFIG.n === "number")&&(GLOBAL_CONFIG.n >= 1)){
      n = Math.min(GLOBAL_CONFIG.n, nProducts);
    }
    
    //Remove products shown in previous interactions with the app
    products = this.filterShownProducts(products);

    // If adaptive behaviour enabled: try to sort products based on difficulty
    let products_sorted = false;
    if(GLOBAL_CONFIG.adaptive === true){
      let difficulty = this.getUserDifficulty();
      if(typeof difficulty !== "undefined"){
        products = this.sortProductsByDifficulty(products,difficulty);
        products_sorted = true;
      }
    }

    //Limit number of products if n > available products
    if(typeof n === "number"){
      products = products.slice(0, n);
      nProducts = products.length;
    }

    //Establish choices (i.e. dumpsters for products)
    for(let i = 0; i < nProducts; i++){
      products[i].dumpsters = ["yellow","green","blue","brown","gray","sigre","facility"];
    }

    quiz.current_products = products;

    //Save quiz in state
    this.props.dispatch(updateQuiz(quiz));

    // Create objectives (one per question/product included in the quiz)
    let objectives = [];
    for(let j = 0; j < nProducts; j++){
      objectives.push(new Utils.Objective({id:("Product" + (j + 1)), progress_measure:(1 / nProducts), score:(1 / nProducts)}));
    }
    this.props.dispatch(addObjectives(objectives));
  }

  //Remove products shown in previous interactions with the app
  filterShownProducts(products){
    let nProducts = products.length;
    if(nProducts === 0){
      return products;
    }
    let showedProducts = LocalStorage.getSetting("showed_products");
    if((!(showedProducts instanceof Array))||(showedProducts.length === 0)){
      return products;
    }
    let nShowedProducts = showedProducts.length;

    let all_products_filtered = [];
    let filtered_products = [];
    for(let i = 0; i<nProducts; i++){
      let filtered = false;
      for(let j = 0; j<nShowedProducts; j++){
        if((typeof products[i]["name"] === "object")&&(typeof products[i]["name"]["en"] === "string")&&((products[i]["name"]["en"] === showedProducts[j]))){
          filtered = true;
          filtered_products.push(products[i]);
          break;
        }
      }
      if(filtered === false){
        all_products_filtered.push(products[i]);
      }
    }
    let nProductsFiltered = all_products_filtered.length;
    if(nProductsFiltered === 0){
      this.resetStoredProducts();
      return this.filterShownProducts(products);
    }
    if((typeof n === "number")&&(n > nProductsFiltered)){
      let productsToAdd = Math.min((n - nProductsFiltered),filtered_products.length);
      for(let k=0; k<productsToAdd; k++){
        all_products_filtered.push(filtered_products[k]);
      }
      all_products_filtered = Utils.shuffleArray(all_products_filtered);
    }

    return all_products_filtered;
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
    let storedDifficulty = LocalStorage.getSetting("difficulty");
    if((typeof storedDifficulty === "number")&&(storedDifficulty >= 1 && storedDifficulty <= 10)){
      return storedDifficulty;
    }
    //Difficulty specified in config file
    if((typeof GLOBAL_CONFIG.difficulty === "number")&&(GLOBAL_CONFIG.difficulty >= 0)&&(GLOBAL_CONFIG.difficulty <= 10)){
      return GLOBAL_CONFIG.difficulty;
    }
    return undefined;
  }

  resetStoredProducts(){
    let showedProducts = LocalStorage.getSetting("showed_products");
    let incorrectProducts = LocalStorage.getSetting("incorrect_products");
    if((showedProducts instanceof Array)&&(showedProducts.length > 0)&&(incorrectProducts instanceof Array)&&(incorrectProducts.length > 0)){
      let newShowedProducts = [];
      for(let i=0; i<showedProducts.length; i++){
        let incorrect = false;
        for(let j=0; j<incorrectProducts.length; j++){
          if(showedProducts[i]===incorrectProducts[j]){
            incorrect = true;
            break;
          }
        }
        if(incorrect===false){
          newShowedProducts.push(showedProducts[i]);
        }
      }
      LocalStorage.saveSetting("showed_products",newShowedProducts);
    } else {
      LocalStorage.saveSetting("showed_products",[]);
    }
    
    LocalStorage.saveSetting("incorrect_products",[]);
  }

  render(){
    let appHeader = (
      <Header dispatch={this.props.dispatch} screen={this.props.screen} user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
    );
    let appContent = "";

    if((this.props.wait_for_user_profile !== true)&&(this.props.quiz.current_products.length > 0)){
      switch(this.props.screen){
        case 0:
          //Instructions
          appContent = (
            <Instructions dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n} LocalStorage={LocalStorage}/>
          );
          break;
        case 1:
          //Quiz
          appContent = (
            <Quiz quiz={this.props.quiz} timer={this.props.timer} dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n} LocalStorage={LocalStorage}/>
          );
          break;
        case 2:
          //Learning
          appContent = (
            <Learning dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
          );
          break;
        case 3:
          //Finish screen
          appContent = (
            <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
          );
          break;
        case 4:
          //About screen
          appContent = (
            <About products={this.props.quiz.all_products} dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
          );
        default:
          //Default
      }
    }

    return (
      <div id="container">
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        {appHeader}
        {appContent}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);