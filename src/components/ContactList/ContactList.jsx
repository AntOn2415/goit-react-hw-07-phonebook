import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoaderThreeDots, LoaderRotatingLines } from '../Loader/Loader';
import ContactItem from '../ContactItem';
import { fetchContacts } from 'redux/operations/contactsOperations';
import {
  contactsSelector,
  isLoadingSelector,
  errorSelector,
  memoizedFilteredContactsSelector,
} from 'redux/selectors';
import {
  LoaderContainer,
  LoaderRotatingLinesContainer,
  ContactUl,
  EmptyContactsMessage,
} from './ContactList.styled';

const ContactList = () => {
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const filter = useSelector(memoizedFilteredContactsSelector);
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();
  const contactsLength = contacts.length;
  const [isFetchingContacts, setIsFetchingContacts] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    setIsFetchingContacts(true);
    dispatch(fetchContacts()).finally(() => {
      setIsFetchingContacts(false);
      setShowEmptyMessage(true);
    });
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  if (isFetchingContacts) {
    return (
      <LoaderRotatingLinesContainer>
        <LoaderRotatingLines />
      </LoaderRotatingLinesContainer>
    );
  }

  if (contactsLength === 0 && showEmptyMessage) {
    return (
      <EmptyContactsMessage>Please add your first contact</EmptyContactsMessage>
    );
  }

  if (contactsLength > 0 && filter.length === 0) {
    return <EmptyContactsMessage>No matching contacts</EmptyContactsMessage>;
  }

  return (
    <>
      <LoaderContainer>
        {isLoading && showEmptyMessage && <LoaderThreeDots />}
      </LoaderContainer>
      {filter.length > 0 && (
        <ContactUl>
          {filter.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </ContactUl>
      )}
    </>
  );
};

export default ContactList;
