import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import gamesReducer from "./games/gamesSlice";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
