import { createSlice } from '@reduxjs/toolkit';
import CARD_DATABASE from 'lib/utils/card-databse';
import SET from 'enums/set.enums';

let initialState = [];

const filteredResultsSlice = createSlice({
  name: 'filteredResults',
  initialState,
  reducers: {
    setResults(state, { payload }) {
      const { cardClass, mechanic, race, set, energyFilter } = payload;
      return Object.keys(CARD_DATABASE)
        .map(i => CARD_DATABASE[i])
        .filter(item => !item.isEntourage)
        .filter(item => item.set === SET[1] || item.set === SET[2])
        .filter(item => {
          if (energyFilter === -1) return item;
          else if (energyFilter === 10) return item.cost >= 10;
          else return item.cost === energyFilter;
        })
        .filter(item => {
          if (set === 'All') return item;
          else return item.set === set;
        })
        .filter(item => {
          if (race === 'All') return item;
          else return item.race === race;
        })
        .filter(item => {
          if (mechanic === 'All') return item;
          else if (item.mechanics.includes(mechanic)) return item;
        })
        .filter(item => {
          return item.cardClass === cardClass;
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
