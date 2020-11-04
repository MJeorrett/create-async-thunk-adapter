import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {  updateField, useGetFiledById,  } from '../api';
import { FieldEditor, FieldEditorFormValues } from '../components';
import { pathFactories } from '../Routes';

export const EditFieldPage = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const fieldId = parseInt(id);
  
  const {
    isLoading,
    error,
    data: field,
  } = useGetFiledById(fieldId);
  
  const handleSubmit = async (field: FieldEditorFormValues, id?: number) => {
    if (!id) throw new Error('Expected id to have a value.');
    await updateField({
      ...field,
      id,
    });
    history.push(pathFactories.fields());
  };

  return (
    <>
      <h2>Edit Field</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        error ? (
          <p>{error}</p>
        ) : (
          <FieldEditor id={field.id} initialValue={field} onSubmit={handleSubmit} />
        )
      )}
    </>
  )
};