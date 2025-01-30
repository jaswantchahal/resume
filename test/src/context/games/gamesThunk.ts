import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosService from "../../utils/axiosService";

interface Games {
  game_name: string,
  provider_name: string,
}

interface GetGameParams {
  refetch?: boolean;
  loader?: boolean;
  modalLoader?: boolean;
}

// Define the type for the rejected value
type RejectWithValue<T> = {
  error: T;
};

export const getGamesThunk = createAsyncThunk<Games, GetGameParams, { rejectValue: RejectWithValue<unknown> }>(
  'getGame',
  async ({ refetch, loader, modalLoader }, { rejectWithValue }) => {
    try {
      const response = await axiosService.get<{ list: Games }>("/games/getGames");
      return response.list; // This is correct if response.data is the structure you need
    } catch (error) {
      console.error(error);
      return rejectWithValue({ error });
    }
  }
);
