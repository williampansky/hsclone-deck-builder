import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  home: {
    name: 'CardCollection',
    order: 0,
    prompt: 'Your Cards',
    mobilePrompt: 'Your Cards',
    path: '/',
    metaTitle: 'Your Cards Collection',
    metaDescription: 'Your collection of cards.'
  },
  deck: {
    name: 'CardCollection',
    order: 0,
    prompt: 'Your Cards',
    mobilePrompt: 'Your Cards',
    path: '/',
    metaTitle: 'Your Cards Collection',
    metaDescription: 'Your collection of cards.'
  }
};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {}
});

export const {} = routesSlice.actions;
export default routesSlice.reducer;
