import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoaderThreeDots } from '../Loader/Loader';
import ContactItem from '../ContactItem';
import { fetchContacts } from 'redux/operations/contactsOperations';
import { isLoadingSelector, errorSelector, memoizedFilteredContactsSelector} from 'redux/selectors';
import { LoaderContainer, ContactUl, ErrorP } from './ContactList.styled';

const ContactList = () => {
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const filter = useSelector(memoizedFilteredContactsSelector); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
    <LoaderContainer>
    { isLoading && <LoaderThreeDots />}
    </LoaderContainer>
{error && !isLoading && <ErrorP>{error}</ErrorP>}
    { filter.length > 0 && (<ContactUl>
      {filter.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ContactUl>)}
    </>
  );
};

export default ContactList;
