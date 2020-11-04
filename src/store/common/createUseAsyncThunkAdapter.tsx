import { AsyncThunk } from "@reduxjs/toolkit";
import { AsyncEntityAdapterState } from "./createAsyncThunkAdapter";
import { ApiResponse } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

interface AsyncThunkAdapter<T, TApiResponse, TRootState> {
  asyncThunk: AsyncThunk<ApiResponse<TApiResponse>, void, {}>,
  getSelectors: (selectRootState: (state: TRootState) => AsyncEntityAdapterState<T>) => {
    all: (state: TRootState) =>  T[],
    isLoading: (state: TRootState) => boolean,
    apiErrorMessage: (state: TRootState) => string,
  },
  selectAdapterState: (state: TRootState) => AsyncEntityAdapterState<T>
}

export const createUseAsyncThunkAdapter = <TRootState, T, TApiResponse>(
  asyncThunkAdapter: AsyncThunkAdapter<T, TApiResponse, TRootState>
) => () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncThunkAdapter.asyncThunk());
  }, [dispatch]);

  const selectors = asyncThunkAdapter.getSelectors(asyncThunkAdapter.selectAdapterState);

  return {
    all: useSelector(selectors.all),
    isLoading: useSelector(selectors.isLoading),
    apiErrorMessage: useSelector(selectors.apiErrorMessage),
    reload: () => dispatch(asyncThunkAdapter.asyncThunk()),
  }
};