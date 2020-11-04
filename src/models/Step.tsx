export interface StepSummary {
  id: number,
  title: string,
}

export interface Step extends StepSummary {
  helpText: string,
}

export interface CreateStepDto {
  title: string,
  helpText: string,
}