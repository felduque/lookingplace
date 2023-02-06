import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "http://localhost:3000/property/getproperty";

export const getPropertiesAsync = createAsyncThunk("properties/get", () => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
});

export const getPropertyByIdAsync = createAsyncThunk(
  "properties/getId",
  (id) => {
    return fetch(`http://localhost:3000/property/${id}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
);

const initialState = {
  allPropertys: [],
  propertyDetail: {},
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    getdata: (state) => {
      state.value += 1;
    },
  },
  extraReducers: {
    [getPropertiesAsync.fulfilled]: (state, action) => {
      state.allPropertys = action.payload;
    },
    [getPropertyByIdAsync.fulfilled]: (state, action) => {
      state.propertyDetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getdata } = propertySlice.actions;

export default propertySlice.reducer;
