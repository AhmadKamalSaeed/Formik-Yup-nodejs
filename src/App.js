import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initialValues = {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
};

    const validationSchema = Yup.object().shape({
      title: Yup.string()
          .required('Title is required'),
      firstName: Yup.string()
          .required('First Name is required'),
      lastName: Yup.string()
          .required('Last Name is required'),
      email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
      password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string()
          .when('password', (password, schema) => {
              if (password) return schema.required('Confirm Password is required');
          })
          .oneOf([Yup.ref('password')], 'Passwords must match')
  });

    function onSubmit(fields) {
        // display form field values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className="card m-3">
                        <h5 className="card-header">React + Formik + Yup Dynamic Form </h5>
                        <div className="card-body border-bottom">
                            <div className="form-row">
                            <div className="form-group col">
                                <label>Title</label>
                                <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Ms">Ms</option>
                                </Field>
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            </div>
                            <div className="form-row">
                            <div className="form-group col-7">
                                <label>Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>
                                    Password
                                </label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default App;