import { createSlice } from '@reduxjs/toolkit';
import CARDCLASS from 'enums/cardClass.enums';
import replaceConstant from 'utils/replace-constants';

let initialState = {
  selectedCardClass: localStorage.getItem('selectedCardClass')
    ? localStorage.getItem('selectedCardClass')
    : CARDCLASS[1],
  selectedEnergyFilter: -1,
  availableCardClasses: [
    { _order: 0, name: replaceConstant(CARDCLASS[0]), value: CARDCLASS[0] },
    { _order: 1, name: replaceConstant(CARDCLASS[1]), value: CARDCLASS[1] },
    { _order: 2, name: replaceConstant(CARDCLASS[2]), value: CARDCLASS[2] },
    { _order: 3, name: replaceConstant(CARDCLASS[3]), value: CARDCLASS[3] },
    { _order: 4, name: replaceConstant(CARDCLASS[4]), value: CARDCLASS[4] },
    { _order: 5, name: replaceConstant(CARDCLASS[5]), value: CARDCLASS[5] },
    { _order: 6, name: replaceConstant(CARDCLASS[6]), value: CARDCLASS[6] },
    { _order: 7, name: replaceConstant(CARDCLASS[7]), value: CARDCLASS[7] },
    { _order: 8, name: replaceConstant(CARDCLASS[8]), value: CARDCLASS[8] },
    { _order: 9, name: replaceConstant(CARDCLASS[9]), value: CARDCLASS[9] }
  ]
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    selectClass(state, { payload }) {
      state.selectedCardClass = payload;
    },
    selectEnergy(state, { payload }) {
      const incomingValue = parseInt(payload);
      state.selectedEnergyFilter === incomingValue
        ? (state.selectedEnergyFilter = -1)
        : (state.selectedEnergyFilter = incomingValue);
    }
  }
});

export const { selectClass, selectEnergy } = filtersSlice.actions;
export default filtersSlice.reducer;
