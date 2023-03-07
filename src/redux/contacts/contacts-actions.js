import { createAction } from '@reduxjs/toolkit';

export const getContactsPending = createAction('contacts/get/pending');
export const getContactsFulfilled = createAction('contacts/get/fulfilled');
export const getContactsRejected = createAction('contacts/get/rejected');

export const addContactPending = createAction('contact/add/pending');
export const addContactFulfilled = createAction('contact/add/fulfilled');
export const addContactRejected = createAction('contact/add/rejected');

export const deleteContactPending = createAction('contact/delete/pending');
export const deleteContactFulfilled = createAction('contact/delete/fulfilled');
export const deleteContactRejected = createAction('contact/delete/rejected');
