import { configureStore } from "@reduxjs/toolkit";
import newGameReducer from "../reducers/newGameSlice";

export const store = configureStore({
  reducer: {
    newGame: newGameReducer,
  },
});