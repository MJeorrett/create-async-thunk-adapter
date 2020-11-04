import { StepSummary } from '../models';
import { get } from './common/apiClient';

export interface GetAllStepSummariesContent {
  stepSummaries: StepSummary[],
};

export function getAllStepSummaries() {
  const url = '/api/step-summaries';
  return get<GetAllStepSummariesContent>(url);
};