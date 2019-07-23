function quizReducer(state = false, action){
  switch (action.type){
  case 'UPDATE_QUIZ':
    if(typeof action.quiz === "object"){
      if(typeof action.quiz.current_product_index!=="number"){
        action.quiz.current_product_index = 1;
      }
      if(typeof action.quiz.selected_dumpster!=="string"){
        action.quiz.selected_dumpster = undefined;
      }
      return action.quiz;
    }
    return state;
  case 'UPDATE_QUESTION_INDEX':
    if((typeof action.index === "number")&&(action.index >= 1)&&(action.index <= state.current_products.length)&&(action.index != state.current_product_index)){
      let newState = JSON.parse(JSON.stringify(state));
      newState.current_product_index = action.index;
      newState.selected_dumpster = undefined;
      return newState;
    }
    return state;
  case 'SELECT_DUMPSTER':
    if((typeof action.dumpster === "string")||(action.dumpster === undefined)){
      let newState = JSON.parse(JSON.stringify(state));
      newState.selected_dumpster = action.dumpster;
      return newState;
    }
    return state;
  default:
    return state;
  }
}

export default quizReducer;