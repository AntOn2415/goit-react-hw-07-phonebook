import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../operations/contactsOperations';
import {
  handlePending,
  handleRejected,
  handleFulfilledOnFetchContacts,
  handleFulfilledOnAddContact,
  handleFulfilledOnDeleteContact,
} from './contactsHandlers';

const defaultsStatus = {
  pending: 'pending',
  rejected: 'rejected',
};

const actionFunctions = [fetchContacts, addContact, deleteContact];

const getActionFunctionsByStatus = status =>
  actionFunctions.map(el => el[status]);

const contactInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledOnFetchContacts)
      .addCase(addContact.fulfilled, handleFulfilledOnAddContact)
      .addCase(deleteContact.fulfilled, handleFulfilledOnDeleteContact)
      .addMatcher(
        isAnyOf(...getActionFunctionsByStatus(defaultsStatus.pending)),
        handlePending
      )
      .addMatcher(
        isAnyOf(...getActionFunctionsByStatus(defaultsStatus.rejected)),
        handleRejected
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
