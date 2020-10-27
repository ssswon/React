import { combineReducers } from 'redux';
import { authSaga } from '../modules/auth';
import { all } from 'redux-saga/effects';
import auth from './auth';
const rootReducer = combineReducers({
  auth,
});

export const rootSaga = function* () {
  yield all([authSaga()]);
};
export default rootReducer;
