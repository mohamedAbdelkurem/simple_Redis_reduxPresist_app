import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  user: null,
  users: [],
  loading: false,
  loadingUser: false,
  loadingDeleteing: false,
  errors: null,
};




export const getUsers = createAsyncThunk(
    "users/getusers",
    async (username, { rejectWithValue }) => {
      try {

      
        console.log("User is ",username)

        const response = await axios.put('http://localhost:5000/api/search/',{username});
        console.log(response.data)
        return response.data;
      } catch (err) {
        console.log(err)
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const deletecache = createAsyncThunk(
    "users/deletecache",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.delete("http://localhost:5000/api/search/");
      
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      resetUser(state) {
        state.posted = false
      }
    },
    extraReducers: {


  // ─── getRepos ───────────────────────────────────────────────────────
    //
    [getUsers.pending]: (state) => {
        state.loading = true;
        state.errors = null;
      },
      [getUsers.fulfilled]: (state, action) => {
        state.users = action.payload;
  
        state.loading = false;
        state.errors = null;
      },
      [getUsers.rejected]: (state, action) => {
        state.users = null;
        state.loading = false;
        state.errors = action.payload;
      }
    },

    [deletecache.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deletecache.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deletecache.rejected]: (state, action) => {
      state.user = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },

  });

  export const { resetUser } = userSlice.actions
export default userSlice.reducer;