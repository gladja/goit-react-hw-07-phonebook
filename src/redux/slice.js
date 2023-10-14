import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {addContacts, getAllContacts, deleteContacts} from './api-request';

const handlePending = (state) => {
  state.contacts.isLoading = true;
};

const handleFulfilled = (state) => {
  state.contacts.isLoading = false
}

const handleRejected = (state, { error }) => {
  console.log(error);
  state.contacts.isLoading = false;
  state.contacts.error = error.message;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
      })
      .addCase(addContacts.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        const deleteItem = state.contacts.items.filter(el => el.id !== payload.id)
        state.contacts.items = deleteItem;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), handlePending)
      .addMatcher((action) => action.type.endsWith('/rejected'), handleRejected)
      .addMatcher((action) => action.type.endsWith('/fulfilled'), handleFulfilled);
  },

  reducers: {
    filterContacts: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { filterContacts } = contactsSlice.actions;
