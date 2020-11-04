export interface FieldSummary {
  id: number,
  label: string,
}

export interface Field extends FieldSummary {
  helpText: string,
}

export interface CreateFieldDto {
  label: string,
  helpText: string,
}