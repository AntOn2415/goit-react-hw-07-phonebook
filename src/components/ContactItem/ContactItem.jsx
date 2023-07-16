import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations/contactsOperations';
import { ContactLi, ContactBtn } from './ContactItem.styled';
import { Loader } from '../Loader/Loader';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const { name, phone } = contact;

  const onDeleteContact = contactId => {
    setIsDeleting(true);
    dispatch(deleteContact(contactId)).finally(() => {
      setIsDeleting(false);
    });
  };

  return (
    <ContactLi>
      <p>
        {name}: {phone}
      </p>
      <ContactBtn
        type="button"
        disabled={isDeleting}
        onClick={() => onDeleteContact(contact.id)}
      >
        {isDeleting && <Loader />}
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
