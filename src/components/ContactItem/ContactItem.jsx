import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations/contactsOperations';
import { ContactLi, ContactBtn } from './ContactItem.styled';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, phone } = contact;

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));

    console.log(contactId);

  };

  return (
    <ContactLi>
      <p>
        {name}: {phone}
      </p>
      <ContactBtn type="button" onClick={() => onDeleteContact(contact.id)}>
        Delete
      </ContactBtn>
    </ContactLi>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
