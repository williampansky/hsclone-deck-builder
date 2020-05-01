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
    setSidebar(state, { payload }) {
      state.sidebarActive = payload;
    },
    toggleSidebar(state) {
      state.sidebarActive = state.sidebarActive === true ? false : true;
    }
  }
});

export const { setSidebar, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
