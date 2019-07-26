import {combineReducers} from 'redux';
import trackingReducer from './trackingReducer';
import scormReducer from './scormReducer';
import userProfileReducer from './userProfileReducer';
import waitForUserProfileReducer from './waitForUserProfileReducer';
import screenReducer from './screenReducer';
import quizReducer from './quizReducer';
import timerReducer from './timerReducer';

const GlobalState = combineReducers({
  tracking:trackingReducer,
  scorm:scormReducer,
  user_profile:userProfileReducer,
  wait_for_user_profile:waitForUserProfileReducer,
  screen:screenReducer,
  quiz:quizReducer,
  timer:timerReducer,
});

export default GlobalState;