import * as Tracker from '../vendors/Tracker.js';

function screenReducer(state = false, action){
  switch (action.type){
  case 'CHANGE_SCREEN':
    if(typeof action.screen === "number"){
      //Notify to tracker
      Tracker.storeScreen(action.screen);
      return action.screen;
    }
    return state;
  case 'FINISH_APP':
    Tracker.storeScreen(3);
    return 3;
  default:
    return state;
  }
}

export default screenReducer;

/*
  SCREEN 0 = Instructions
  SCREEN 1 = QUIZ
  SCREEN 2 = LEARNING
  SCREEN 3 = FINISH SCREEN
  SCREEN 4 = ABOUT SCREEN
*/