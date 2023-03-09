import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'services/contactsAxios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.fetchContactsFromDB();
      return data;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

const isDublicate = (contacts, data) => {
  const { name, number } = data;

  const normalizedName = name.toLowerCase();

  const dublicateName = contacts.find(
    ({ name }) => name.toLowerCase() === normalizedName
  );
  const dublicateNumber = contacts.find(
    ({ number: phone }) => number === phone
  );

  if (dublicateName || dublicateNumber) {
    return true;
  }
  return false;
};

export const addContactOnServer = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue, getState }) => {
    try {
      const { data } = await api.postContact(contact);
      return data;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  },
  {
    condition: (contact, { getState }) => {
      const {
        contacts: { items },
      } = getState();
      if (isDublicate(items, contact)) {
        alert('This contact already in the phonebook!');
        return false;
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteContactFromDB(id);
      return data;
    } catch ({ message }) {
      return rejectWithValue(message);
    }
  }
);

// const { fetchContactsFromDB, deleteContactFromDB, postContact } = api;

// export const fetchContacts = () => {
//   const func = async dispatch => {
//     try {
//       dispatch(getContactsPending);
//       const { data } = await fetchContactsFromDB();
//       dispatch(getContactsFulfilled(data));
//     } catch ({ response }) {
//       dispatch(getContactsRejected(response));
//     }
//   };
//   return func;
// };

// export const addContactOnServer = contact => {
//   const func = async (dispatch, getState) => {
//     try {
//       const {
//         contacts: { items },
//       } = getState();

//       if (isDublicate(items, contact)) {
//         alert(`This contact already in phonebook!`);
//         return;
//       }
//       dispatch(addContactPending);
//       const { data } = await postContact(contact);
//       dispatch(addContactFulfilled(data));
//     } catch ({ response }) {
//       dispatch(addContactRejected(response));
//     }
//   };
//   return func;
// };

// export const deleteContact = id => {
//   const func = async dispatch => {
//     try {
//       dispatch(deleteContactPending);
//       await deleteContactFromDB(id);
//       dispatch(deleteContactFulfilled(id));
//     } catch ({ response }) {
//       dispatch(deleteContactRejected(response));
//     }
//   };
//   return func;
// };
