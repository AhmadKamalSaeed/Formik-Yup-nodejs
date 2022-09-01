import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import { useDispatch, useSelector } from 'react-redux';
import { registerUser, signInUser } from '../../store/actions/user_actions';
import { TextField, Button } from '@material-ui/core';
import PreventAuthRoute from '../../hoc/preventAuthRoute';



const Auth = (props) => {
    const [register, setRegister] = useState(false);
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();



    const formik = useFormik({
        initialValues: { email: '', password: '', firstname: '', lastname: '' },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required('Sorry the email is required')
                .email('This is not a valid email'),
            password: Yup.string().min(6)
                .required('Sorry the password is required'),
            firstname: Yup.string().max(10),
            lastname: Yup.string().max(10)
        }),
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values)
        }
    });
    console.log(formik)


    const handleSubmit = (values) => {
        if (register) {
            dispatch(registerUser(values))
        } else {
            dispatch(signInUser(values))
        }
    }


    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });

    useEffect(() => {
        if (notifications && notifications.success) {
            props.history.push('/')
        }
    }, [notifications, props.history])


    return (
        <PreventAuthRoute>
            <div className="auth_container">
                <h4>Authenticate</h4>
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                    <div className="form-group m-5 col-4">
                        <TextField
                            style={{ width: '100%' }}
                            name="email"
                            label="Enter your email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik, 'email')}
                        />
                    </div>
                    <div className="form-group m-5 col-4">
                        <TextField
                            style={{ width: '100%' }}
                            name="password"
                            label="Enter your password"
                            type="password"
                            variant="outlined"
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}
                        />
                    </div>
                    {
                        register ?
                            <>
                                <div className="form-group m-5 col-4">
                                    <TextField
                                        style={{ width: '100%' }}
                                        name="firstname"
                                        label="First Name"
                                        type="text"
                                        variant="outlined"
                                        {...formik.getFieldProps('firstname')}
                                        {...errorHelper(formik, 'firstname')}
                                    />
                                </div>
                                <div className="form-group m-5 col-4">
                                    <TextField
                                        style={{ width: '100%' }}
                                        name="lastname"
                                        label="Last Name"
                                        type="text"
                                        variant="outlined"
                                        {...formik.getFieldProps('lastname')}
                                        {...errorHelper(formik, 'lastname')}
                                    />
                                </div>
                            </>
                            :
                            null
                    }

                    <Button variant="contained" color="primary" type="submit" size="large">
                        {register ? 'Register' : 'Login'}
                    </Button>

                    <div>
                        <Button
                            variant="contained"
                            className="mt-3"
                            color="secondary"
                            size="small"
                            onClick={() => setRegister(!register)}
                        >
                            Want to {!register ? 'Register' : 'Login'} ?
                        </Button>
                    </div>

                </form>

            </div>
        </PreventAuthRoute>

    )
}

export default Auth;