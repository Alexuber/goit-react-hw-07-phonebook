export const getFilter = state => state.filter;
export const getContacts = state => state.contacts.items;
export const getFilteredContacts = ({ filter, contacts: { items } }) => {
  if (!filter) {
    return items;
  }
  const normalizedFilter = filter.toLowerCase();
  const result = items.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );

  return result;
};

export const getError = state => state.contacts.error;
export const getIsLoading = state => state.contacts.isLoading;
