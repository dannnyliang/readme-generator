import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import reducerPath from "../reducerPath";

export type Error = {
  title: string;
  message: string;
  info: any;
};

type ErrorState = {
  errors: Error[];
};

const initialState: ErrorState = {
  errors: [],
};

const errorSlice = createSlice({
  name: reducerPath.reducers.error,
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<Required<Error>>) => {
      state.errors = [...state.errors, action.payload];
    },
    removeError: (state, action: PayloadAction<Required<Error>["title"]>) => {
      const newErrors = state.errors.filter(
        (error) => error.title !== action.payload
      );
      state.errors = newErrors;
    },
    clearError: (state) => {
      state.errors = [];
    },
  },
});

/** ----- Actions ----- */
export const { addError, removeError, clearError } = errorSlice.actions;

/** ----- Reducer ----- */
export default errorSlice.reducer;
