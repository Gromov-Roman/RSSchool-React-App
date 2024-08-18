import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { uncontrolledReducer } from '@core/slices/uncontrolled';
import { controlledReducer } from '@core/slices/controlled';
import { countriesReducer } from '@core/slices/countries';

const rootReducer = combineReducers({
  countriesReducer,
  uncontrolledReducer,
  controlledReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
