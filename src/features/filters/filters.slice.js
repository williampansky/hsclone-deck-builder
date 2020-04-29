import { createSlice } from '@reduxjs/toolkit';
import CARDCLASS from 'enums/cardClass.enums';
import replaceConstant from 'utils/replace-constants';
import RACE from 'enums/race.enums';
import MECHANICS from 'enums/mechanics.enums';
import SET from 'enums/set.enums';

let initialState = {
  selectedCardClass: localStorage.getItem('selectedCardClass')
    ? localStorage.getItem('selectedCardClass')
    : CARDCLASS[1],
  selectedCardMechanics: [],
  selectedCardRace: `All`,
  selectedCardSet: `All`,
  selectedEnergyFilter: -1,
  availableCardClasses: [
    { _order: 0, label: replaceConstant(CARDCLASS[0]), value: CARDCLASS[0] },
    { _order: 1, label: replaceConstant(CARDCLASS[1]), value: CARDCLASS[1] },
    { _order: 2, label: replaceConstant(CARDCLASS[2]), value: CARDCLASS[2] },
    { _order: 3, label: replaceConstant(CARDCLASS[3]), value: CARDCLASS[3] },
    { _order: 4, label: replaceConstant(CARDCLASS[4]), value: CARDCLASS[4] },
    { _order: 5, label: replaceConstant(CARDCLASS[5]), value: CARDCLASS[5] },
    { _order: 6, label: replaceConstant(CARDCLASS[6]), value: CARDCLASS[6] },
    { _order: 7, label: replaceConstant(CARDCLASS[7]), value: CARDCLASS[7] },
    { _order: 8, label: replaceConstant(CARDCLASS[8]), value: CARDCLASS[8] },
    { _order: 9, label: replaceConstant(CARDCLASS[9]), value: CARDCLASS[9] }
  ],
  availableCardMechanics: MECHANICS.map(m => {
    return {
      label: replaceConstant(m),
      value: m
    };
  }).sort((a, b) => {
    if (a.label > b.label) return 1;
    if (a.label < b.label) return -1;
    return 1;
  }),
  // availableCardMechanics: [
  //   { _order: 1, label: `All`, value: `All` },
  //   { _order: 2, label: replaceConstant(MECHANICS[1]), value: MECHANICS[1] },
  //   { _order: 3, label: replaceConstant(MECHANICS[2]), value: MECHANICS[2] },
  //   { _order: 4, label: replaceConstant(MECHANICS[3]), value: MECHANICS[3] },
  //   { _order: 5, label: replaceConstant(MECHANICS[4]), value: MECHANICS[4] },
  //   { _order: 6, label: replaceConstant(MECHANICS[5]), value: MECHANICS[5] },
  //   { _order: 7, label: replaceConstant(MECHANICS[6]), value: MECHANICS[6] },
  //   { _order: 8, label: replaceConstant(MECHANICS[7]), value: MECHANICS[7] },
  //   { _order: 9, label: replaceConstant(MECHANICS[8]), value: MECHANICS[8] },
  //   { _order: 10, label: replaceConstant(MECHANICS[9]), value: MECHANICS[9] },
  //   { _order: 11, label: replaceConstant(MECHANICS[10]), value: MECHANICS[10] },
  //   { _order: 12, label: replaceConstant(MECHANICS[11]), value: MECHANICS[11] },
  //   { _order: 13, label: replaceConstant(MECHANICS[12]), value: MECHANICS[12] },
  //   { _order: 14, label: replaceConstant(MECHANICS[13]), value: MECHANICS[13] },
  //   { _order: 15, label: replaceConstant(MECHANICS[14]), value: MECHANICS[14] },
  //   { _order: 16, label: replaceConstant(MECHANICS[15]), value: MECHANICS[15] },
  //   { _order: 17, label: replaceConstant(MECHANICS[16]), value: MECHANICS[16] },
  //   { _order: 18, label: replaceConstant(MECHANICS[17]), value: MECHANICS[17] },
  //   { _order: 19, label: replaceConstant(MECHANICS[18]), value: MECHANICS[18] },
  //   { _order: 20, label: replaceConstant(MECHANICS[19]), value: MECHANICS[19] },
  //   { _order: 21, label: replaceConstant(MECHANICS[20]), value: MECHANICS[20] },
  //   { _order: 22, label: replaceConstant(MECHANICS[21]), value: MECHANICS[21] },
  //   { _order: 23, label: replaceConstant(MECHANICS[22]), value: MECHANICS[22] },
  //   { _order: 24, label: replaceConstant(MECHANICS[23]), value: MECHANICS[23] },
  //   { _order: 25, label: replaceConstant(MECHANICS[24]), value: MECHANICS[24] },
  //   { _order: 26, label: replaceConstant(MECHANICS[25]), value: MECHANICS[25] },
  //   { _order: 27, label: replaceConstant(MECHANICS[26]), value: MECHANICS[26] },
  //   { _order: 28, label: replaceConstant(MECHANICS[27]), value: MECHANICS[27] },
  //   { _order: 29, label: replaceConstant(MECHANICS[28]), value: MECHANICS[28] },
  //   { _order: 30, label: replaceConstant(MECHANICS[29]), value: MECHANICS[29] },
  //   { _order: 31, label: replaceConstant(MECHANICS[30]), value: MECHANICS[30] },
  //   { _order: 32, label: replaceConstant(MECHANICS[31]), value: MECHANICS[31] },
  //   { _order: 33, label: replaceConstant(MECHANICS[32]), value: MECHANICS[32] },
  //   { _order: 34, label: replaceConstant(MECHANICS[33]), value: MECHANICS[33] },
  //   { _order: 35, label: replaceConstant(MECHANICS[34]), value: MECHANICS[34] },
  //   { _order: 36, label: replaceConstant(MECHANICS[35]), value: MECHANICS[35] },
  //   { _order: 37, label: replaceConstant(MECHANICS[36]), value: MECHANICS[36] },
  //   { _order: 38, label: replaceConstant(MECHANICS[37]), value: MECHANICS[37] }
  // ],
  availableCardRaces: [
    { _order: 0, label: `All`, value: `All` },
    { _order: 1, label: replaceConstant(RACE[0]), value: RACE[0] },
    { _order: 2, label: replaceConstant(RACE[1]), value: RACE[1] },
    { _order: 3, label: replaceConstant(RACE[2]), value: RACE[2] },
    { _order: 4, label: replaceConstant(RACE[3]), value: RACE[3] },
    { _order: 5, label: replaceConstant(RACE[4]), value: RACE[4] },
    { _order: 6, label: replaceConstant(RACE[5]), value: RACE[5] },
    { _order: 7, label: replaceConstant(RACE[6]), value: RACE[6] },
    { _order: 8, label: replaceConstant(RACE[7]), value: RACE[7] },
    { _order: 9, label: replaceConstant(RACE[8]), value: RACE[8] },
    { _order: 10, label: replaceConstant(RACE[9]), value: RACE[9] }
  ],
  availableCardSets: [
    { _order: 0, label: `All`, value: `All` },
    { _order: 2, label: replaceConstant(SET[1]), value: SET[1] },
    { _order: 3, label: replaceConstant(SET[2]), value: SET[2] }
  ]
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    deselectMechanic(state, { payload }) {
      const arr = state.selectedCardMechanics.filter(o => o !== payload);
      state.selectedCardMechanics = arr;
    },
    selectClass(state, { payload }) {
      state.selectedCardClass = payload;
    },
    selectEnergy(state, { payload }) {
      const incomingValue = parseInt(payload);
      state.selectedEnergyFilter === incomingValue
        ? (state.selectedEnergyFilter = -1)
        : (state.selectedEnergyFilter = incomingValue);
    },
    selectMechanic(state, { payload }) {
      if (!payload) state.selectedCardMechanics = [];
      else state.selectedCardMechanics = payload.map(m => m.value);
    },
    selectRace(state, { payload }) {
      state.selectedCardRace = payload;
    },
    selectSet(state, { payload }) {
      state.selectedCardSet = payload;
    }
  }
});

export const {
  selectClass,
  selectEnergy,
  selectMechanic,
  selectRace,
  selectSet
} = filtersSlice.actions;
export default filtersSlice.reducer;
