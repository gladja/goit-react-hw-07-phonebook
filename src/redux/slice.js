import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { nanoid } from 'nanoid';
import { getContacts, removeContacts } from '../service/api-request';

// export const getAllContacts = () => async (dispatch) => {
//   const data = await getContacts();
//   console.log(data);
// }

export const getAllContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const data = await getContacts();
    // console.log(data);
    return data;
  });

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContact',
  async () => {
    const data = await removeContacts();
    // console.log(data);
    return data;
  });


const handlePending = (state) => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload.message;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      // .addCase(getAllContacts.pending, handlePending)
      .addCase(getAllContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = payload;
      })
      // .addCase(getAllContacts.rejected, handleRejected)
      .addMatcher((action) => action.type.endsWith('/pending'), handlePending)
      .addMatcher((action) => action.type.endsWith('/rejected'), handleRejected);


  },

  // extraReducers: {
  //   [getAllContacts.pending]: (state) => {
  //     state.contacts.isLoading = true
  //   },
  //   [getAllContacts.fulfilled]: (state, {payload}) => {
  //     state.contacts.isLoading = false
  //     state.contacts.items = payload
  //   },
  //   [getAllContacts.rejected]: (state, {payload}) => {
  //     state.contacts.isLoading = false
  //     state.contacts.error = payload.message
  //   },
  // },

  reducers: {
    //
    //   createContacts: {
    //     prepare: (data) => {
    //       return {
    //         payload: {
    //           id: nanoid(),
    //           ...data,
    //         },
    //       };
    //     },
    //     reducer: (state, { type, payload }) => {
    //       // state.contacts &&
    //       state.contacts.push(payload); //state.contacts ? state.contacts.push(payload) : state.contacts = [payload]
    //     },
    //
    //   },
    //
    //
    //   deleteContacts: (state, { payload }) => {
    //     const filteredItems = state.contacts.filter(el => el.id !== payload);
    //     state.contacts = filteredItems;
    //   },
    //
    filterContacts: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { createContacts,  filterContacts } = contactsSlice.actions;
