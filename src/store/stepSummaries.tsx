import {
  createSlice,
} from '@reduxjs/toolkit';

import { getAllStepSummaries } from '../api';
import { StepSummary } from '../models';
import { createAsyncEntityAdapter, createUseAsyncThunkAdapter, AsyncEntityAdapterState } from './common';

export const name = 'stepSummaries';

interface RootState {
  stepSummaries: AsyncEntityAdapterState<StepSummary>
}

const stepSummaryAdapter = createAsyncEntityAdapter({
  actionName: `${name}/fetchAll`,
  selectId: (step: StepSummary) => step.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
  unpackApiResponse: apiResponse => apiResponse.content.stepSummaries,
  payloadCreator: async () => {
    return await getAllStepSummaries();
  },
  selectAdapterState: (state: RootState) => state[name],
});

const slice = createSlice({
  name,
  initialState: stepSummaryAdapter.getInitialState(),
  reducers: {
  },
  extraReducers: builder => {
    stepSummaryAdapter.buildExtraReducers(builder);
  },
});

export const { reducer } = slice;
export const useStepSummaries = createUseAsyncThunkAdapter(stepSummaryAdapter);
