import React from 'react';
import AdminLayout from '../../hoc/adminLayout';
import {useSelector, useDispatch} from 'react-redux'
import { editUser } from '../../store/actions/user_actions'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@material-ui/core';


const Dashboard = (props) => {
    const user = useSelector(state => state.users)
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: { firstname: user.data.firstname, lastname: user.data.lastname },
        validationSchema: Yup.object().shape({
            firstname: Yup.string().max(10).required(),
            lastname: Yup.string().max(10).required()
        }),
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values)
        }
    });


    const handleSubmit = (values) => {
            dispatch(editUser(values,user.data._id ))
            props.history.push('/')
    }

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });


    return(
        <AdminLayout section="Dashboard">
            <div className="auth_container">
                <h4>Edit Section</h4>
                <form className="mt-3" onSubmit={formik.handleSubmit}>
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
                    <Button variant="contained" color="primary" type="submit" size="large">
                        Edit
                    </Button>

                </form>

            </div>
        </AdminLayout>
    )
}

export default Dashboard;