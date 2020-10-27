import { createActionType } from '../lib/createActionType';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import axios from 'axios';

const CHANGE_FIELD = 'auth/CHANGE_FIELD'; //input태그의 field바꾸는 것
const INITIAL_FIELD = 'auth/INITIAL_FIELD';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionType('LOGIN');

//action함수

export const changeField = ({ key, value }) => ({
  type: CHANGE_FIELD,
  key,
  value, //input태그의 값을 변경한다.
});

export const initialField = () => ({
  type: INITIAL_FIELD,
  //값을 초기화 할 것이기 때문에 값을 따로 넣어 줄 필요 없다.
});
export const login = (id) => ({
  type: LOGIN,
  payload: id,
});

function* loginSaga(action) {
  try {
    const response = yield call(() => authAPI.login(action.payload));
    yield put({
      type: LOGIN_SUCCESS,
      payload: response.data,
      meta: response,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e,
      error: true,
    });
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
}

//초기 state
const initialState = {
  auth: null, //로그인 하면 들어올 인증된 사용자 정보
  authError: null,
  form: {
    //로그인 폼의 내용
    id: '',
  },
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        form: {
          [action.key]: action.value,
        },
      };
    case INITIAL_FIELD:
      return {
        ...state,
        form: initialState.form,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload,
        authError: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        auth: null,
        authError: action.payload,
      };
    default:
      return state;
  }
};
export default auth;
