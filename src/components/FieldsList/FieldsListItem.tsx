import React from 'react';
import { Link } from 'react-router-dom';
import { pathFactories } from '../../Routes';

type FieldsListItemProps = {
  field: {
    id: number,
    label: string,
  },
}

export const FieldsListItem: React.FC<FieldsListItemProps> = ({
  field,
}) => {
  return (
    <div style={{ border: '1px solid', marginTop: '1rem' }}>
      <h4>{field.label} ({field.id})</h4>
      <Link to={pathFactories.editField(field.id)}>Edit</Link>
    </div>
  );
}