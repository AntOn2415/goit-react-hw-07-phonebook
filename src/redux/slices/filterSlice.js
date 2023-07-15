import { createSlice } from '@reduxjs/toolkit';

const FilterInitialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: FilterInitialState,
  reducers: {
    setFilter(_, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;