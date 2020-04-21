import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'reducers/rootReducer';
const rootReducerPath = 'reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept(rootReducerPath, () => {
    const newRootReducer = require(rootReducerPath).default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
