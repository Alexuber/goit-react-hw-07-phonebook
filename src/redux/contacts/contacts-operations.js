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
import * as api from 'services/contactsAxios';

const { fetchContactsFromDB, deleteContactFromDB, postContact } = api;

export const fetchContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(getContactsPending());
      const { data } = await fetchContactsFromDB();
      dispatch(getContactsFulfilled(data));
    } catch ({ response }) {
      dispatch(getContactsRejected(response));
    }
  };
  return func;
};

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

export const addContactOnServer = contact => {
  const func = async (dispatch, getState) => {
    try {
      const {
        contacts: { items },
      } = getState();

      if (isDublicate(items, contact)) {
        alert(`This contact already in phonebook!`);
        return;
      }
      dispatch(addContactPending());
      const { data } = await postContact(contact);
      dispatch(addContactFulfilled(data));
    } catch ({ response }) {
      dispatch(addContactRejected(response));
    }
  };
  return func;
};

export const deleteContact = id => {
  const func = async dispatch => {
    try {
      dispatch(deleteContactPending());
      await deleteContactFromDB(id);
      dispatch(deleteContactFulfilled(id));
    } catch ({ response }) {
      dispatch(deleteContactRejected(response));
    }
  };
  return func;
};
