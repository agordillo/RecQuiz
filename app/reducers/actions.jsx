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

export function objectiveAccomplished(objectiveId, accomplishedScore = null, user_selection){
  return {
    type:'OBJECTIVE_ACCOMPLISHED',
    objective_id:objectiveId,
    accomplished_score:accomplishedScore,
    user_selection: user_selection
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

export function updateTimer(timer = 100){
  return {
    type:'UPDATE_TIMER',
    timer:timer,
  };
}

export function finishApp(finished = true){
  return {
    type:'FINISH_APP',
    finished:finished,
  };
}