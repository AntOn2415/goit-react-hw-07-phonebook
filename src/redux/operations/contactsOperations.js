import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64aaeb660c6d844abedefc09.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts`);

      const existingNameContact = response.data.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (existingNameContact) {
        throw new Error(
          `Sorry. A contact with the name ${name} already exists.`
        );
      }

      const existingPhoneContact = response.data.find(
        contact => contact.phone === phone
      );

      if (existingPhoneContact) {
        throw new Error(
          `Sorry. A contact with the phone number ${phone} already exists.`
        );
      }

      const createResponse = await axios.post('/contacts', { name, phone });
      return createResponse.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
