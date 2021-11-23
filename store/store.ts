import { configureStore } from "@reduxjs/toolkit";
import { picsumApi } from "./services/picsum";
export const store = configureStore({
  reducer: {
    [picsumApi.reducerPath]: picsumApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(picsumApi.middleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
