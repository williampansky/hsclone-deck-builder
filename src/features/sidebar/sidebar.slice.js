import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  sidebarActive: localStorage.getItem('sidebarActive')
    ? JSON.parse(localStorage.getItem('sidebarActive'))
    : false
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarActive = state.sidebarActive === true ? false : true;
    }
  }
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
