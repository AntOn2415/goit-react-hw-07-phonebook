import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPersonPlus, BsTelephonePlus } from 'react-icons/bs';
import { addContact } from 'redux/operations/contactsOperations';
import { isLoadingSelector } from 'redux/selectors';
import {
  FormContainer,
  Form,
  IconWrapper,
  LabelForm,
  LabelSpan,
  InputForm,
  BtnForm,
} from './ContactForm.styled';

function ContactForm() {
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value.replace(/(^|\s)\S/g, match => match.toUpperCase()));
        break;

      case 'number':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const handleAddContact = e => {
    e.preventDefault();

    dispatch(addContact({ name, phone }));
    setName('');
    setPhone('');
  };

  return (
    <FormContainer>
      <Form onSubmit={handleAddContact}>
        <LabelForm>
          <IconWrapper>
            <BsPersonPlus />
          </IconWrapper>
          <LabelSpan>Name</LabelSpan>
          <InputForm
            type="text"
            value={name}
            name="name"
            pattern="^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+(([' \-][a-zA-Zа-яА-ЯґҐєЄіІїЇ ])?[a-zA-Zа-яА-ЯґҐєЄіІїЇ]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
            onChange={handleChange}
          />
        </LabelForm>
        <LabelForm>
          <IconWrapper>
            <BsTelephonePlus />
          </IconWrapper>
          <LabelSpan>Number</LabelSpan>
          <InputForm
            type="tel"
            value={phone}
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter phone number"
            onChange={handleChange}
          />
        </LabelForm>

        <BtnForm type="submit" isLoading={isLoading} disabled={isLoading}>
          Add contact
        </BtnForm>
      </Form>
    </FormContainer>
  );
}

export default ContactForm;
