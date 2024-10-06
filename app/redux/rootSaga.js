import { put, takeLatest, all } from 'redux-saga/effects';
import { getAdmin } from './modules/admin';
import * as types from './actions/actionConstants';
import { getAgent } from './modules/agent';
function* init() {
  const admin = yield getAdmin();
  if (admin) {
    yield put({
      type: types.SET_ADMIN,
      payload: {
        ...admin,
      },
    });
  }
}

function* agentInit() {
  const agent = yield getAgent();
  if (agent) {
    yield put({
      type: types.SET_AGENT,
      payload: {
        ...agent,
      },
    });
  }
}

function* refreshUserDetails() {
  const admin = yield getAdmin();
  if (admin) {
    yield put({
      type: types.SET_ADMIN,
      payload: admin,
    });
  }
}

function* actionWatcher() {
  yield takeLatest(types.INIT, init);
  yield takeLatest(types.AGENT_INIT, agentInit);
  yield takeLatest(types.REFRESH_ADMIN_DETAILS, refreshUserDetails);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
