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
};

export const handleFulfilledOnDeleteContact = (state, { payload }) => {
  const updatedItems = state.items.filter(contact => contact.id !== payload.id);

  return {
    ...state,
    isLoading: false,
    items: updatedItems,
  };
};
