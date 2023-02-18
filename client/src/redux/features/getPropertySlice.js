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

/* 

export const getCommentByIdAsync = createAsyncThunk(
  "comments/getId",
  async (id, thunkApi) => {
    return fetch(`http://localhost:3000/comment/${id}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
);

export const getCommentsAsync = createAsyncThunk(
  "comments/get",
  async (url, thunkApi) => {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
);





allComments: [],
  commentsDetail: {},


builder.addCase(getCommentsAsync.fulfilled, (state, action) => {
      state.allComments = action.payload;
    });
    builder.addCase(getCommentByIdAsync.fulfilled, (state, action) => {
      state.commentsDetail = action.payload;
    });*/
