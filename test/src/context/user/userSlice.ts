import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk } from "./userThunk";

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  userStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
  userStatus: 'idle',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.userStatus = 'pending';
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.userInfo = payload; // payload must match UserInfo
        state.userStatus = 'fulfilled';
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.userStatus = 'rejected';
      });
  },  
});

export const selectUserState = (state: { user: any; }) => state.user;

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
