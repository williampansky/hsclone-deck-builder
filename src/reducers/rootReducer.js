import { combineReducers } from '@reduxjs/toolkit';

import configSlice from 'features/config.slice';
import routesSlice from 'features/routes.slice';

const rootReducer = combineReducers({
  config: configSlice,
  routes: routesSlice
});

export default rootReducer;
