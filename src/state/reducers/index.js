import { combineReducers } from 'redux';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import statusReducer from './statusReducer';
import session from './sessionReducer';

const sessionPersistConfig = {
  key: 'session',
  storage: localForage,
  whitelist: ['authenticated', 'info', 'user'],
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
  session: persistReducer(sessionPersistConfig, session),
  statusReducer
});

export default rootReducer;
