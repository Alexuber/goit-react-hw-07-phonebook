export const getFilter = state => state.filter;
export const getContacts = state => state.contacts.items;
export const getFilteredContacts = (filter, contacts) => {
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

export const getError = state => state.contacts.error;
export const getIsLoading = state => state.contacts.isLoading;
