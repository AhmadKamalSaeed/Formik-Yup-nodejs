import {
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    GET_USERS,
    SIGN_OUT,
    SITE_LAYOUT,
    GET_USER
} from '../types';

export const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})
export const getUser = (users) => ({
    type:GET_USER,
    payload: users
})

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
});

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
});

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}

export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user
});

export const signOut = () => ({
    type:SIGN_OUT
})

export const appLayout = (layout) => ({
    type:SITE_LAYOUT,
    payload: layout
})

