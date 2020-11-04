import React from 'react';
import { useFieldSummaries } from '../store';
import * as Components from '../components';
import { Link } from 'react-router-dom';
import { pathFactories } from '../Routes';

export const FieldsListPage = () => {
  const fieldSummaries = useFieldSummaries();

  return (
    <>
      <h2>Fields</h2>
      {fieldSummaries.apiErrorMessage ?
        (
          <h4>{fieldSummaries.apiErrorMessage}</h4>
        ) :
        (
          <>
            <Link to={pathFactories.createField()}>Create New</Link>
            <span style={{ marginLeft: '1rem' }}>{fieldSummaries.isLoading ? 'Loading...' : ' '}</span>
            <Components.FieldsList
              fieldSummaries={fieldSummaries.all}
            />
          </>
        )}
    </>
  );
};
