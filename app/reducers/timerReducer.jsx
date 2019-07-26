function timerReducer(state = 100, action){
  switch (action.type){
  case 'UPDATE_TIMER':
    if(typeof action.timer === "number"){
      return action.timer;
    }
    return state;
   case 'UPDATE_QUESTION_INDEX':
   	return 100;
  default:
    return state;
  }
}

export default timerReducer;