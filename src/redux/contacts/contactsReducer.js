import { createReducer } from '@reduxjs/toolkit';
import {
  getContactsPending,
  getContactsFulfilled,
  getContactsRejected,
  addContactPending,
  addContactFulfilled,
  addContactRejected,
  deleteContactPending,
  deleteContactFulfilled,
  deleteContactRejected,
} from './contacts-actions';

const INITIAL_STATE = {
  isLoading: false,
  items: [],
  error: null,
};

export const contactsReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(getContactsPending, state => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getContactsFulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
    })
    .addCase(
      getContactsRejected,
      (state, { payload }) => (state.error = payload)
    )
    .addCase(addContactPending, state => (state.isLoading = true))
    .addCase(addContactFulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.items.push(payload);
    })
    .addCase(addContactRejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    })
    .addCase(deleteContactPending, state => (state.isLoading = true))
    .addCase(deleteContactFulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.items = state.items.filter(({ id }) => id !== payload);
    })
    .addCase(deleteContactRejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
});
