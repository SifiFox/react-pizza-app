import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkApi) => {
    const { sortBy, order, category, search, currentPage } = params;

    const { data } = await axios.get(
      `https://63bd18d2d66006238899fbe8.mockapi.io/items?page=${currentPage}&limit=4&${`${category}`}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log(action, "fullfiled");

      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log(action, "rejected");
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export default pizzaSlice.reducer;
export const { setItems } = pizzaSlice.actions;
