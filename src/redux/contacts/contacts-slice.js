import { createSlice } from '@reduxjs/toolkit';
import * as operations from './contacts-operations';

const initialState = {
  isLoading: false,
  items: [],
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(operations.fetchContacts.pending, handlePending)
      .addCase(operations.fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(operations.fetchContacts.rejected, handleRejected)
      .addCase(operations.addContactOnServer.pending, handlePending)
      .addCase(
        operations.addContactOnServer.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.items.push(payload);
        }
      )
      .addCase(operations.addContactOnServer.rejected, handleRejected)
      .addCase(operations.deleteContact.pending, handlePending)
      .addCase(operations.deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = state.items.filter(({ id }) => id !== payload.id);
      })
      .addCase(operations.deleteContact.rejected, handleRejected);
  },
});

export default contactsSlice.reducer;

// object notation

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [operations.fetchContacts.pending]: handlePending,
//     [operations.fetchContacts.fulfilled](state, { payload }) {
//       state.isLoading = false;
//       state.items = payload;
//     },
//     [operations.fetchContacts.rejected]: handleRejected,
//     [operations.addContactOnServer.pending]: handlePending,
//     [operations.addContactOnServer.fulfilled](state, { payload }) {
//       state.isLoading = false;
//       state.items.push(payload);
//     },
//     [operations.addContactOnServer.rejected]: handleRejected,
//     [operations.deleteContact.pending]: handlePending,
//     [operations.deleteContact.fulfilled](state, { payload }) {
//       state.isLoading = false;
//       state.items = state.items.filter(({ id }) => id !== payload.id);
//     },
//     [operations.deleteContact.rejected](state, { payload }) {
//       state.isLoading = false;
//       state.error = payload;
//     },
//   },
// });

// export default contactsSlice.reducer;
