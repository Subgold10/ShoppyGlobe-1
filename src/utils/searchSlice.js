import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  filteredProducts: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredProducts = [];
    },
  },
});

export const { setSearchTerm, setFilteredProducts, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;