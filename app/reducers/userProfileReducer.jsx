import * as Tracker from '../vendors/Tracker.js';

function userProfileReducer(state = {}, action){
  switch (action.type){
  case 'UPDATE_USER_PROFILE':
    if(typeof action.user_profile.learner_preference !== "object"){
      action.user_profile.learner_preference = {};
    }
    Tracker.storeUserProfile(action.user_profile);
    return action.user_profile;
  default:
    return state;
  }
}

export default userProfileReducer;