import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPropertiesAsync = createAsyncThunk(
  "properties/get",
  async (url, thunkApi) => {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
);

export const getPropertyByIdAsync = createAsyncThunk(
  "properties/getId",
  async (id, thunkApi) => {
    return fetch(`https://looking.fly.dev/property/${id}`)
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
  extraReducers: (builder) => {
    builder.addCase(getPropertiesAsync.fulfilled, (state, action) => {
      state.allPropertys = action.payload;
    });
    builder.addCase(getPropertyByIdAsync.fulfilled, (state, action) => {
      state.propertyDetail = action.payload;
    });
  },
  // {
  //   [getPropertiesAsync.fulfilled]: (state, action) => {
  //     state.allPropertys = action.payload;
  //   },
  //   [getPropertyByIdAsync.fulfilled]: (state, action) => {
  //     state.propertyDetail = action.payload;
  //   },
  // },
});

// Action creators are generated for each case reducer function
export const { getdata } = propertySlice.actions;

export default propertySlice.reducer;
