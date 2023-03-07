import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    contactFilter(_, action) {
      return action.payload;
    },
  },
});

export const { contactFilter } = filterSlice.actions;
export default filterSlice.reducer;
