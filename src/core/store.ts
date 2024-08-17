import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { uncontrolledReducer } from '@core/slices/uncontrolled';
import { controlledReducer } from '@core/slices/controlled';

const rootReducer = combineReducers({
  uncontrolledReducer,
  controlledReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
