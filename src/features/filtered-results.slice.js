import { createSlice } from '@reduxjs/toolkit';
import CARD_DATABASE from 'lib/utils/card-databse';
import SET from 'enums/set.enums';

let initialState = [];

const filteredResultsSlice = createSlice({
  name: 'filteredResults',
  initialState,
  reducers: {
    setResults(state, { payload }) {
      const { cardClass, energyFilter } = payload;
      return Object.keys(CARD_DATABASE)
        .map(i => CARD_DATABASE[i])
        .filter(item => !item.isEntourage)
        .filter(item => item.set === SET[1])
        .filter(item => {
          if (energyFilter === -1) {
            return item.cardClass === cardClass;
          } else if (energyFilter === 10) {
            return item.cardClass === cardClass && item.cost >= 10;
          } else {
            return item.cardClass === cardClass && item.cost === energyFilter;
          }
        })
        .sort((a, b) => {
          if (a.cost > b.cost) return 1;
          if (a.cost < b.cost) return -1;
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 1;
        });
    }
  }
});

export const { setResults } = filteredResultsSlice.actions;
export default filteredResultsSlice.reducer;
