import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosService from "../../utils/axiosService";

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

interface GetUserParams {
  refetch?: boolean;
  loader?: boolean;
  modalLoader?: boolean;
}

// Define the type for the rejected value
type RejectWithValue<T> = {
  error: T;
};

export const getUserThunk = createAsyncThunk<UserInfo, GetUserParams, { rejectValue: RejectWithValue<unknown> }>(
  'getUser',
  async ({ refetch, loader, modalLoader }, { rejectWithValue }) => {
    try {
      const response = await axiosService.get<{ data: UserInfo }>("/user/getuser_details");
      return response.data; // This is correct if response.data is the structure you need
    } catch (error) {
      console.error(error);
      return rejectWithValue({ error });
    }
  }
);
