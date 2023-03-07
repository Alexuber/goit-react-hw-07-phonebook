import { ContactListItem } from 'components/ContactsListItem/ContactsListItem';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilter,
  getFilteredContacts,
} from 'redux/contacts/selectors';
import {
  fetchContacts,
  deleteContact,
} from 'redux/contacts/contacts-operations';
import styles from './ContactsList.module.scss';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filtered = getFilteredContacts(filter, contacts);

  return (
    <ul className={styles.list}>
      {filtered.map(contact => {
        const { id, name, number } = contact;
        return (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            deleteContact={() => dispatch(deleteContact(id))}
          />
        );
      })}
    </ul>
  );
};
