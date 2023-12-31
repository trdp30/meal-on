import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { restaurantApi } from "store/sliceApis/restaurantApi";
import { menuItemApi } from "./sliceApis/menuItemApi";
import { userApi } from "./sliceApis/userApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(restaurantApi.middleware)
      .concat(menuItemApi.middleware)
      .concat(userApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default configureStore;
