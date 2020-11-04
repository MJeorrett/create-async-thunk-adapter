import React from 'react';
import { Form, Field, FormikProps } from 'formik'

export interface FieldEditorFormValues {
  label: string,
  helpText: string,
};

interface OtherProps {
}

export const FieldEditor: React.FC<OtherProps & FormikProps<FieldEditorFormValues>> = ({
  touched,
  errors,
  isSubmitting,
}) => {
  return (
    <Form>
      <label>Label: </label>
      <Field type="text" name="label" />
      {touched.label && errors.label && (
        <p>{errors.label}</p>
      )}
      <br />
      
      <label>Help Text: </label>
      <Field type="text" name="helpText" />
      {touched.helpText && errors.helpText && (
        <p>{errors.helpText}</p>
      )}
      <br />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </Form>
  )
};
