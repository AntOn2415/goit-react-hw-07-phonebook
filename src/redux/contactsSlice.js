import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contacts/contactsOperations';

const defaultsStatus = {
  pending: 'pending',
  rejected: 'rejected',
}
const actionFunctions = [fetchContacts, addContact, deleteContact];

const getActionFunctionsByStatus = (status) => actionFunctions.map((el) => el[status])

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilledOnFetchContacts = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = payload;
}

const handleFulfilledOnAddContact = (state, { payload }) => {
  const { id, name, phone } = payload;
        const suchNameExists = state.items.some(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        );
        if (suchNameExists) {
          alert(`${name} is already in contacts.`);
          return;
        }
        state.items.push({ id, name, phone });
}

const handleFulfilledOnDeleteContact = (state, { payload }) => {
  state.isLoading = false;
        const contactId = payload;
        state.items = state.items.filter(contact => contact.id !== contactId.id);
}

const contactInitialState = {
  items: [],
  isLoading: false,
  error: null
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledOnFetchContacts)
      .addCase(addContact.fulfilled, handleFulfilledOnAddContact)
      .addCase(deleteContact.fulfilled, handleFulfilledOnDeleteContact)
      .addMatcher(isAnyOf(...getActionFunctionsByStatus(defaultsStatus.pending)),handlePending)
      .addMatcher(isAnyOf(...getActionFunctionsByStatus(defaultsStatus.rejected)),handleRejected)
    }
});

export const contactsReducer = contactsSlice.reducer;