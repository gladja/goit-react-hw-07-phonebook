import data from '../data/data.json'

export const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: '',
};
