import { createSelector } from '@reduxjs/toolkit';

export const contactsSelector = state => state.contacts.items;

const memoizedContactsSelector = createSelector(contactsSelector, contacts =>
  [...contacts].sort((a, b) => a.name.localeCompare(b.name))
);

export const isLoadingSelector = state => state.contacts.isLoading;
export const errorSelector = state => state.contacts.error;

export const selectFilter = state => state.filter;

export const memoizedFilteredContactsSelector = createSelector(
  [memoizedContactsSelector, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
