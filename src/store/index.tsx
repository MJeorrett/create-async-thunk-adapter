import { configureStore } from '@reduxjs/toolkit';
import * as fieldSummariesSlice from './fieldSummaries';
import * as stepSummariesSlice from './stepSummaries';

export const store = configureStore({
  reducer: {
    [fieldSummariesSlice.name]: fieldSummariesSlice.reducer,
    [stepSummariesSlice.name]: stepSummariesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export { useFieldSummaries } from './fieldSummaries';
export { useStepSummaries } from './stepSummaries';