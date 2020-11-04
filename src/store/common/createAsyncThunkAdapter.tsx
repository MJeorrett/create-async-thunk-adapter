import {
  ActionReducerMapBuilder,
  CaseReducer,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

import { ApiSuccessResponse, ApiResponse } from '../../api/common/ApiResponse';

export interface AsyncEntityAdapterState<T> {
  entities: EntityState<T>,
  isLoading: boolean,
  apiErrorMessage: string,
}

export function createAsyncEntityAdapter<T, TApiResponse, TRootState>({
  actionName,
  selectId,
  sortComparer,
  unpackApiResponse,
  payloadCreator,
  selectAdapterState,
}: {
  actionName: string,
  selectId: (entity: T) => number,
  sortComparer: (a: T, b: T) => number,
  unpackApiResponse: (apiResponse: ApiSuccessResponse<TApiResponse>) => T[],
  payloadCreator: () => Promise<ApiResponse<TApiResponse>>,
  selectAdapterState: (state: TRootState) => AsyncEntityAdapterState<T>
}) {

  const entityAdapter = createEntityAdapter<T>({
    selectId,
    sortComparer,
  });

  const asyncThunk = createAsyncThunk(
    actionName,
    payloadCreator,
  );

  const setPendingReducer: CaseReducer<AsyncEntityAdapterState<T>> = (state) => {
    state.isLoading = true;
  };

  const setAllReducer: CaseReducer<AsyncEntityAdapterState<T>, PayloadAction<ApiResponse<TApiResponse>>> = (state, action) => {
    state.isLoading = false;
    const payload = action.payload;
    if (payload.isError) {
      state.apiErrorMessage = payload.errorMessage;
    }
    else {
      entityAdapter.upsertMany(state.entities as EntityState<T>, unpackApiResponse(payload));
    }
  };

  const actions = {
    pending: asyncThunk.pending,
    fulfilled: asyncThunk.fulfilled,
  };

  return {
    getInitialState: () => ({
      entities: entityAdapter.getInitialState(),
      isLoading: false,
      apiErrorMessage: '',
    }),
    actions,
    setPendingReducer,
    setAllReducer,
    getSelectors() {
      const entityAdapterSelectors = entityAdapter.getSelectors<TRootState>(state => selectAdapterState(state).entities);
      return {
        ...entityAdapterSelectors,
        all: entityAdapterSelectors.selectAll,
        isLoading: createSelector(
          selectAdapterState,
          state => state.isLoading
        ),
        apiErrorMessage: createSelector(
          selectAdapterState,
          state => state.apiErrorMessage,
        ),
      }
    },
    buildExtraReducers: (builder: ActionReducerMapBuilder<AsyncEntityAdapterState<T>>) => {
      builder.addCase(actions.pending, setPendingReducer);
      builder.addCase(actions.fulfilled, setAllReducer);
    },
    asyncThunk,
    selectAdapterState,
  }
};