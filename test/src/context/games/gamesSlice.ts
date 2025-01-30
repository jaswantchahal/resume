import { createSlice } from "@reduxjs/toolkit";
import { getGamesThunk } from "./gamesThunk";

interface games {
  game_name: string,
  provider_name: string,
}

interface GameState {
  games: games | null;
  gamesStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: GameState = {
  games: null,
  gamesStatus: 'idle',
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGamesThunk.pending, (state) => {
        state.gamesStatus = 'pending';
      })
      .addCase(getGamesThunk.fulfilled, (state, { payload }) => {
        state.games = payload;
        state.gamesStatus = 'fulfilled';
      })
      .addCase(getGamesThunk.rejected, (state) => {
        state.gamesStatus = 'rejected';
      });
  },  
});

export const selectGameState = (state: { games: any; }) => state.games;

export default gamesSlice.reducer;
