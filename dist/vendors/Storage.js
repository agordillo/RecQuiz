import {GLOBAL_CONFIG} from '../config/config.js';

let ls_supported = false;

export function init(){
  ls_supported = !!window.localStorage
    && typeof localStorage.getItem === 'function'
    && typeof localStorage.setItem === 'function'
    && typeof localStorage.removeItem === 'function';
}

function getData(){
  if(ls_supported === false){
    return {};
  }
  let storedData = localStorage.getItem("RecQuiz");
  if((typeof storedData === "undefined")||(storedData === null)){
    return {};
  }
  try {
    return JSON.parse(storedData);
  } catch (e){
    return {};
  }
}

function saveData(data){
  if(ls_supported === false){
    return undefined;
  }
  try {
    data = JSON.stringify(data);
    localStorage.setItem("RecQuiz",data);
  } catch (e){
    return undefined;
  }
  return data;
}

export function getSetting(settingName){
  if(ls_supported === false){
    return undefined;
  }
  let data = getData();
  if(typeof data === "object"){
    return data[settingName];
  }
  return undefined;
}

export function saveSetting(settingName,value){
  if(ls_supported === false){
    return undefined;
  }
  let data = getData();
  if(typeof data === "object"){
    data[settingName] = value;
    return saveData(data);
  }
  return undefined;
}

export function saveShowedProduct(product){
  if((typeof product !== "object")||(typeof product["id"] !== "number")){
    return undefined;
  }
  let showedProducts = this.getSetting("showed_products");
  if(!(showedProducts instanceof Array)){
    showedProducts = [];
  }
  if(showedProducts.indexOf(product["id"])===-1){
    showedProducts.push(product["id"]);
  } else {
    return undefined;
  }
  return this.saveSetting("showed_products",showedProducts);
}

export function saveIncorrectProduct(product){
  if((typeof product !== "object")||(typeof product["id"] !== "number")){
    return undefined;
  }
  let incorrectProducts = this.getSetting("incorrect_products");
  if(!(incorrectProducts instanceof Array)){
    incorrectProducts = [];
  }
  if(incorrectProducts.indexOf(product["id"])===-1){
    incorrectProducts.push(product["id"]);
  } else {
    return undefined;
  }
  return this.saveSetting("incorrect_products",incorrectProducts);
}

export function clear(){
  if(ls_supported === false){
    return undefined;
  }
  localStorage.removeItem("RecQuiz");
  return undefined;
}