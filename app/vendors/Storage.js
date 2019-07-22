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
    return undefined;
  }
  let storedData = localStorage.getItem("RecQuiz");
  if((typeof storedData === "undefined")||(storedData === null)){
    return undefined;
  }
  try {
    return JSON.parse(storedData);
  } catch (e){
    return undefined;
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

function saveSetting(settingName,value){
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