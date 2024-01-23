import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const FormSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required').min(6, 'Mininum 6 characters'),

  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  agency: Yup.string().required('agency is required'),
  review: Yup.string()
    .required('Review is required')
    .min(6, 'Mininum 6 characters')
    .max(32, 'Maximum 32 characters'),
});
