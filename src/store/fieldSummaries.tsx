import {
  createSlice,
} from '@reduxjs/toolkit';

import { getAllFieldSummaries } from '../api';
import { FieldSummary } from '../models';
import { createAsyncEntityAdapter, createUseAsyncThunkAdapter, AsyncEntityAdapterState } from './common';

export const name = 'fieldSummaries';

interface RootState {
  fieldSummaries: AsyncEntityAdapterState<FieldSummary>
}

const fieldSummaryAdapter = createAsyncEntityAdapter({
  actionName: `${name}/fetchAll`,
  selectId: (field: FieldSummary) => field.id,
  sortComparer: (a, b) => a.label.localeCompare(b.label),
  unpackApiResponse: apiResponse => apiResponse.content.fieldSummaries,
  payloadCreator: async () => {
    return await getAllFieldSummaries();
  },
  selectAdapterState: (state: RootState) => state[name],
});

const slice = createSlice({
  name,
  initialState: fieldSummaryAdapter.getInitialState(),
  reducers: {
  },
  extraReducers: builder => {
    fieldSummaryAdapter.buildExtraReducers(builder);
  },
});

export const { reducer } = slice;
export const useFieldSummaries = createUseAsyncThunkAdapter(fieldSummaryAdapter);
