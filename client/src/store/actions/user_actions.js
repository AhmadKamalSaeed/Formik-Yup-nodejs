import * as Users from './index';
import axios from 'axios';
import { getAuthHeader,removeTokenCookie, getTokenCookie } from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'




export const getUsers = () =>{
    return async(dispatch)=>{
        try{
            if(!getTokenCookie()){
                throw new Error();
            }
            const users = await axios.get(`/api/users/getusers`,getAuthHeader());
            dispatch(Users.getUsers({users: users.data}))
        }
        catch(error){
            console.log(error)
        }
    }
}

export const getUser = (value) =>{
    return async(dispatch)=>{
        try{
            if(!getTokenCookie()){
                throw new Error();
            }
            const user = await axios.get(`/api/users/getuser/${value}`,getAuthHeader());
            dispatch(Users.getUsers({users: user.data}))
        }
        catch(error){
            console.log(error)
        }
    }
}

export const registerUser = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/users/register`,{
                email: values.email,
                password: values.password,
                firstname: values.firstname,
                lastname: values.lastname
            });

            dispatch(Users.authUser({data: user.data, auth: true }))
            dispatch(Users.successGlobal('Welcome !!'))
        } catch(error){
            dispatch(Users.errorGlobal(error.response.data.message))
        }
    }
}


export const signInUser = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/users/profile/signin`,{
                email: values.email,
                password: values.password
            });

            dispatch(Users.authUser({data: user.data, auth: true }))
            dispatch(Users.successGlobal('Welcome !!'))
        } catch(error){
            dispatch(Users.errorGlobal(error.response.data.message))
        }
    }
}

export const editUser = (values,id) => {
    console.log(values,id)
    return async(dispatch)=>{
        try{
            if(!getTokenCookie()){
                throw new Error();
            }
            const user = await axios.patch(`/api/users/profile/${id}`,{
                firstname: values.firstname,
                lastname: values.lastname
            },getAuthHeader());

            dispatch(Users.authUser({data: user.data, auth: true }))
            dispatch(Users.successGlobal('Done !!'))
        } catch(error){
            dispatch(Users.errorGlobal(error.response.data.message))
        }
    }
}

export const signOut= () => {
    return async (dispatch) => {
        removeTokenCookie();
        dispatch(Users.signOut())
    }
}

export const isAuthUser = () => {
    return async(dispatch) =>{
        try{
            if(!getTokenCookie()){
                throw new Error();
            }
            const user = await axios.get(`/api/users/isauth`,getAuthHeader());
            dispatch(Users.authUser({data: user.data, auth: true }))
        } catch(error){
            dispatch(Users.authUser({data: {}, auth: false }))
        }
    }
}