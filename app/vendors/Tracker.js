import {GLOBAL_CONFIG} from '../config/config.js';
import * as LocalStorage from '../vendors/Storage.js';
import $ from 'jquery';

let trackedDataSent = false;
let user_agent = undefined;
let sessionData = {actions: []};

export function init(){
  try {
    user_agent = navigator.userAgent;
  } catch(e){};

  sessionData.deviceid = LocalStorage.getSetting("deviceid");
  sessionData.timestamp_init = new Date().getTime();
  sessionData.config = GLOBAL_CONFIG;
  sessionData.environment = {};
  sessionData.environment.parents = getParentURLs();

  $(window).on("unload",onBeforeUnload);
}

export function storeQuestionAnswered(objective,user_selection){
  storeAction("QUESTION_ANSWERED",{product_id: objective.product_id, product_friendly_name: objective.product_friendly_name, success: (objective.accomplished_score > 0), user_selection:user_selection, solution:objective.product_solution});
}

export function storeScreen(screen_id){
  storeAction("CHANGE_SCREEN",{screen_id: screen_id});
  if(screen_id === 3){
    _sendTrackedData();
  }
}

export function storeAction(action_type,action_data){
  let action = {};
  action.action_type = action_type;
  action.timestamp = new Date().getTime();
  action.data = action_data;
  sessionData.actions.push(action);
}

export function storeUserProfile(user_profile){
  if(typeof user_profile === "object"){
    sessionData.user_profile = user_profile;
  }
}

export function storeSCORMConnection(scorm){
  if(scorm===true){
    sessionData.environment.scorm = true;
  }
}

function getParentURLs(win,URLs){
  if(typeof win === "undefined"){
    win = window;
  }
  if(typeof URLs === "undefined"){
    URLs = [];
  }
  try {
    URLs.push(win.location.href);
    if((win.parent) && (win.parent !== win)){
      return getParentURLs(win.parent,URLs);
    } else {
      return URLs;
    }
  } catch (e){
    return URLs;
  }
}

function onBeforeUnload(event){
  // LocalStorage.saveSetting("sessionData",sessionData); //Testing
  event.preventDefault();
  _sendTrackedData();
  return null;
}

export function sendTrackedData(){
  _sendTrackedData();
}

function _sendTrackedData(){
  if(trackedDataSent === true){
    return;
  }
  if(typeof GLOBAL_CONFIG.tracker === "undefined"){
    return;
  }
  $.ajax({
    type    : 'POST',
    url     : GLOBAL_CONFIG.tracker.url,
    data    : _composeTrackingObject(),
    async   : true
  });
  trackedDataSent = true;
}

function _composeTrackingObject(){
  sessionData.timestamp_end = new Date().getTime();
  sessionData.duration = Math.round(((sessionData.timestamp_end-sessionData.timestamp_init)/1000));
  return {
    "app_id": GLOBAL_CONFIG.tracker.app_id,
    "app_key": GLOBAL_CONFIG.tracker.app_key,
    "user_agent": user_agent,
    "data": sessionData
  }
}