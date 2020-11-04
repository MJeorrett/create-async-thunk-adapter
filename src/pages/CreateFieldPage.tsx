import React from 'react';
import { useHistory } from 'react-router-dom';

import { createField } from '../api';
import { FieldEditor, FieldEditorFormValues } from '../components';
import { pathFactories } from '../Routes';

export const CreateFieldPage = () => {
  const history = useHistory();

  const handleSubmit = async (field: FieldEditorFormValues) => {
    await createField(field);
    history.push(pathFactories.fields());
  }

  return (
    <>
      <h2>Create Field</h2>
      <FieldEditor onSubmit={handleSubmit} initialValue={{
        label: '',
        helpText: '',
      }} />
    </>
  );
}