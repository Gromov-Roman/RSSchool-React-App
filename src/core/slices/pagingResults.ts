import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PagingResults } from '@models/result.model';

interface PagingResultState {
  pagingResults: PagingResults | undefined | null;
  isFetching: boolean;
}

const initialState: PagingResultState = {
  pagingResults: null,
  isFetching: false,
};

export const pagingResultsSlice = createSlice({
  name: 'pagingResultsReducer',
  initialState,
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setPagingResults: (state, action: PayloadAction<PagingResults | undefined | null>) => {
      state.pagingResults = action.payload;
    },
  },
});

export const pagingResultsReducer = pagingResultsSlice.reducer;
export const pagingResultsActions = pagingResultsSlice.actions;
