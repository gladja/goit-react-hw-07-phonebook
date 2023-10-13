import axios from 'axios';

axios.defaults.baseURL = 'https://65284718931d71583df21c39.mockapi.io/';

export const getContacts = async () => {
  const { data } = await axios('contacts');
  // console.log(data);
  return data;
};


export const removeContacts = async (id) => {
  const { data } = await axios.delete(`contacts/${id}`);
  return data;
};
