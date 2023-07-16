import { toast } from 'react-toastify';

export const handlePending = state => {
  state.isLoading = true;
};

export const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const handleFulfilledOnFetchContacts = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = payload;
};

export const handleFulfilledOnAddContact = (state, { payload }) => {
  const { id, name, phone } = payload;

  state.isLoading = false;
  state.error = null;
  state.items.push({ id, name, phone });
  toast.success(`Contact ${name} : ${phone} added successfully`);
};

export const handleFulfilledOnDeleteContact = (state, { payload }) => {
  const { id, name, phone } = payload;
  const updatedItems = state.items.filter(contact => contact.id !== id);
  toast.success(`Contact ${name} : ${phone} deleted successfully`);
  return {
    ...state,
    isLoading: false,
    items: updatedItems,
  };
};
