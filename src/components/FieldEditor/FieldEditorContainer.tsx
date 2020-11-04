import { withFormik } from 'formik'

import { FieldEditorFormValues, FieldEditor as InnerFieldEditor } from './FieldEditor';

interface FieldEditorProps {
  id?: number,
  initialValue: FieldEditorFormValues,
  onSubmit: (values: FieldEditorFormValues, id?: number) => Promise<void>
}

export const FieldEditor = withFormik<FieldEditorProps, FieldEditorFormValues>({
  mapPropsToValues: (props) => ({
    label: props.initialValue.label,
    helpText: props.initialValue.helpText,
  }),
  handleSubmit: async (values, { resetForm, props }) => {
    await props.onSubmit(values, props.id);
    resetForm();
  },
})(InnerFieldEditor);