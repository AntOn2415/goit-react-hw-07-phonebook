import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from '../ContactItem';
import { fetchContacts } from 'redux/operations/contactsOperations';
import { ContactUl } from './ContactList.styled';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilteredContact = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContact = getFilteredContact();

  return (
    <ContactUl>
      {filteredContact.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ContactUl>
  );
};

export default ContactList;
