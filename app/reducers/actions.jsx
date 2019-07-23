export function scormConnected(scorm){
  return {
    type:'SCORM_CONNECTED',
    scorm:scorm,
  };
}

export function updateUserProfile(user_profile){
  return {
    type:'UPDATE_USER_PROFILE',
    user_profile:user_profile,
  };
}

export function addObjectives(objectives){
  return {
    type:'ADD_OBJECTIVES',
    objectives:objectives,
  };
}

export function resetObjectives(objectives){
  return {
    type:'RESET_OBJECTIVES',
  };
}

export function objectiveAccomplished(objectiveId, accomplishedScore = null){
  return {
    type:'OBJECTIVE_ACCOMPLISHED',
    objective_id:objectiveId,
    accomplished_score:accomplishedScore,
  };
}

// Example of action created using the redux-thunk middleware for Redux
export function objectiveAccomplishedThunk(objectiveId, accomplishedScore = null){
  return (dispatch, getState) => {
    const firstState = JSON.parse(JSON.stringify(getState()));
    dispatch(objectiveAccomplished(objectiveId, accomplishedScore = null));

    // Perform another action after accomplishing the objective
    const secondState = getState();
    if((typeof firstState.tracking.objectives[objectiveId] === "object") && (firstState.tracking.objectives[objectiveId].accomplished === false) && (typeof secondState.tracking.objectives[objectiveId] === "object") && (secondState.tracking.objectives[objectiveId].accomplished === true)){
      // Objective with id objectiveId was accomplished.
      // Do something and/or dispatch another action.
      console.log("Objective with id " + objectiveId + " was accomplished.");
      dispatch(showDialog("Objective with id " + objectiveId + " was accomplished."));
    }
  };
}

export function showDialog(text){
  return (dispatch, getState) => {
    alert(text);
  };
}

export function changeScreen(screen = 1){
  return {
    type:'CHANGE_SCREEN',
    screen:screen,
  };
}

export function updateQuiz(quiz = {}){
  return {
    type:'UPDATE_QUIZ',
    quiz:quiz,
  };
}

export function updateQuestionIndex(index = 1){
  return {
    type:'UPDATE_QUESTION_INDEX',
    index:index,
  };
}

export function selectDumpster(dumpster = undefined){
  return {
    type:'SELECT_DUMPSTER',
    dumpster:dumpster,
  };
}

export function finishApp(finished = true){
  return {
    type:'FINISH_APP',
    finished:finished,
  };
}