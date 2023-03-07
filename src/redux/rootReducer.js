import { combineReducers } from 'redux';
import { contactsReducer } from './contacts/contactsReducer';
import filterReducer from './filter/filterSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export default rootReducer;
