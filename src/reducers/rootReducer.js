import { combineReducers } from '@reduxjs/toolkit';

import configSlice from 'features/config.slice';
import databaseSlice from 'features/database.slice';
import filtersSlice from 'features/filters/filters.slice';
import filteredResultsSlice from 'features/filtered-results.slice';
import routesSlice from 'features/routes.slice';

const rootReducer = combineReducers({
  config: configSlice,
  routes: routesSlice,
  filters: filtersSlice,
  filteredResults: filteredResultsSlice,
  database: databaseSlice
});

export default rootReducer;
