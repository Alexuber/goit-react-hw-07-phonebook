import axios from 'axios';

const BASE_URL = 'https://64074e9f77c1a905a0f4e1ff.mockapi.io';

const contactsInstance = axios.create({
  baseURL: BASE_URL,
});

export const fetchContactsFromDB = () => contactsInstance.get('/contacts');

export const postContact = contact =>
  contactsInstance.post('/contacts', { ...contact });

export const deleteContactFromDB = id =>
  contactsInstance.delete(`/contacts/${id}`);
