import { ContactListItem } from 'components/ContactsListItem/ContactsListItem';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilteredContacts,
  getError,
  getIsLoading,
} from 'redux/contacts/selectors';
import {
  fetchContacts,
  deleteContact,
} from 'redux/contacts/contacts-operations';
import styles from './ContactsList.module.scss';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filtered = useSelector(getFilteredContacts);

  return (
    <ul className={styles.list}>
      {isLoading && contacts.length === 0 && (
        <div style={{ color: 'red' }}> Loading contacts...</div>
      )}
      {filtered.map(contact => {
        const { id, name, number } = contact;

        return (
          <ContactListItem
            key={id}
            name={name}
            number={number}
            deleteContact={() => dispatch(deleteContact(id))}
          />
        );
      })}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </ul>
  );
};
