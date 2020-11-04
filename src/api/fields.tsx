import { useCallback } from 'react';

import { CreateFieldDto, Field } from '../models';
import * as apiClient from './common/apiClient';
import { useApiCall } from './common/useApiCall';

export const createField = (field: CreateFieldDto) => {
  const url = '/api/fields';
  return apiClient.post(url, field);
}

export const getFieldById = (id: number) => {
  const url = `/api/fields/${id}`;
  return apiClient.get<{ field: Field }>(url);
}

export const updateField = (field: Field) => {
  const url = `/api/fields/${field.id}`;
  return apiClient.put(url, field);
}

export const useGetFiledById = (id: number) => useApiCall(
  useCallback(() => getFieldById(id), [id]),
  useCallback(response => response.content.field, []),
);