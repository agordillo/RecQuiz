function screenReducer(state = false, action){
  switch (action.type){
  case 'CHANGE_SCREEN':
    if(typeof action.screen === "number"){
      return action.screen;
    }
    return state;
  case 'FINISH_APP':
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
*/