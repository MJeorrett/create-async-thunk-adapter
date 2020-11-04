import { configureStore } from '@reduxjs/toolkit';
import * as fieldSummariesSlice from './fieldSummaries';

export const store = configureStore({
  reducer: {
    [fieldSummariesSlice.name]: fieldSummariesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export { useFieldSummaries } from './fieldSummaries';