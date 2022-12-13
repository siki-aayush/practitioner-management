import { configureStore } from "@reduxjs/toolkit";
import { toastReducer } from "../reducers/toastSlice";
import { authReducer, userReducer } from "../reducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    toast: toastReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
