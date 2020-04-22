import { createSlice } from '@reduxjs/toolkit';
import CARD_DATABASE from 'lib/utils/card-databse';

let initialState = [];

const filteredResultsSlice = createSlice({
  name: 'filteredResults',
  initialState,
  reducers: {
    setResults(state, { payload }) {
      const { cardClass, energyFilter } = payload;
      return Object.keys(CARD_DATABASE)
        .map(i => CARD_DATABASE[i])
        .filter(item => {
          if (energyFilter === -1) {
            return item.cardClass === cardClass;
          } else if (energyFilter === 10) {
            return item.cardClass === cardClass && item.cost >= 10;
          } else {
            return item.cardClass === cardClass && item.cost === energyFilter;
          }
        })
        .sort((a, b) => a.cost - b.cost);
    }
  }
});

export const { setResults } = filteredResultsSlice.actions;
export default filteredResultsSlice.reducer;
