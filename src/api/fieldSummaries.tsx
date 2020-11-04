import { FieldSummary } from '../models';
import { get } from './common/apiClient';

export interface GetAllFieldSummariesContent {
  fieldSummaries: FieldSummary[],
};

export function getAllFieldSummaries() {
  const url = '/api/field-summaries';
  return get<GetAllFieldSummariesContent>(url);
};