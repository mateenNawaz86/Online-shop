import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk action to fetch profile by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/product-detail/${id}`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Profile slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state while fetching the profile
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Handle the fulfilled state when profile is successfully fetched
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.product = action.payload;
    });

    // Handle the rejected state when there is an error fetching the profile
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.product = null;
    });
  },
});

export default productSlice.reducer;
