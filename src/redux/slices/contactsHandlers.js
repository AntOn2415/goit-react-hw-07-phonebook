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
}

export const handleFulfilledOnAddContact = (state, { payload }) => {
  const { id, name, phone } = payload;
        const suchNameExists = state.items.some(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        );
        if (suchNameExists) {
          alert(`${name} is already in contacts.`);
          return;
        }
        state.items = [{ id, name, phone }, ...state.items];
}

export const handleFulfilledOnDeleteContact = (state, { payload }) => {
  state.isLoading = false;
        state.items = state.items.filter(contact => contact.id !== payload.id);
}