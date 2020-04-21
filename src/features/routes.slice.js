import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  home: {
    name: 'DeckBuilder',
    order: 1,
    prompt: 'Select a Location',
    mobilePrompt: 'Select Location',
    path: '/location'
  }
};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {}
});

export const { setCurrentStep } = routesSlice.actions;
export default routesSlice.reducer;
