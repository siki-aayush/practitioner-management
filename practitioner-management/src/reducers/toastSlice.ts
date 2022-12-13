import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Toast } from "../interfaces/Toast";

const toastState: { toastList: Toast[] } = {
    toastList: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState: toastState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toastList.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<NodeJS.Timeout> ) => {
        state.toastList = state.toastList.filter(toast => toast.id !== action.payload);
    }
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
