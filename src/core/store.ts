import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@core/slices/api';
import { pagingResultsSlice } from '@core/slices/pagingResults';
import { detailSlice } from '@core/slices/detail';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  pagingResultsReducer: pagingResultsSlice.reducer,
  detailReducer: detailSlice.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
