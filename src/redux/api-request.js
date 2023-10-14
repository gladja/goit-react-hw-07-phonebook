import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65284718931d71583df21c39.mockapi.io/';

export const getAllContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const { data } = await axios('contacts');
    return data;
  });

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (newContacts) => {
    const { data } = await axios.post('contacts', newContacts);
    return data
  }
)

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContact',
  async (id) => {
    const { data } = await axios.delete(`contacts/${id}`);
    return data;
  });



// export const getAllContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios('contact');
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e)
//     }
//   });
