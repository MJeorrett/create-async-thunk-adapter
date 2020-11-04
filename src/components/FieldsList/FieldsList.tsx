import React from 'react';

import { FieldSummary } from '../../models';
import { FieldsListItem } from './FieldsListItem';

type FieldListProps = {
  fieldSummaries: FieldSummary[]
};

export const FieldsList: React.FC<FieldListProps> = ({
  fieldSummaries,
}) => {

  return (
    <>
      {fieldSummaries.map(fieldSummary => (
        <FieldsListItem key={fieldSummary.id} field={fieldSummary} />
      ))}
    </>
  )
};
