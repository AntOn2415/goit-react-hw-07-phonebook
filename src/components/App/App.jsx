import { ToastContainer } from 'react-toastify';
import ContactList from '../ContactList';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import { toastConfig } from 'helpers/toastConfig';
import { ContainerDiv, TitleH1, TitleH2 } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <ContainerDiv>
      <TitleH1>Phonebook</TitleH1>
      <ContactForm />
      <TitleH2>Contacts</TitleH2>
      <Filter />
      <ContactList />
      <ToastContainer {...toastConfig} />
    </ContainerDiv>
  );
};

export default App;
