import { combineReducers } from '@reduxjs/toolkit';
import ui from './modules/ui';
import adminModule from './modules/admin';
import agentModule from './modules/agent';

export default function createReducer() {
  const rootReducer = combineReducers({
    ui,
    admin: adminModule,
    agent: agentModule,
  });

  return rootReducer;
}
