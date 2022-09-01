import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { showToast } from '../utils/tools';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { signOut } from '../store/actions/user_actions'
import { clearNotification } from '../store/actions/index';
import { appLayout } from '../store/actions/site_actions';


function Header(props) {
    const [layout, setLayout] = useState('');
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    const singOutUser = () => {
        dispatch(signOut());
        props.history.push('/auth')
    }
    useEffect(() => {
        let pathArray = props.location.pathname.split('/');
        if (pathArray[1] === 'dashboard') {
            setLayout('dash_layout');
            dispatch(appLayout('dash_layout'))
        } else {
            setLayout('');
            dispatch(appLayout(''))
        }
    }, [props.location.pathname, dispatch])


    useEffect(() => {
        if (notifications && notifications.error) {
            const msg = notifications.msg ? notifications.msg : 'Error';
            showToast('ERROR', msg);
            dispatch(clearNotification())
        }
        if (notifications && notifications.success) {
            const msg = notifications.msg ? notifications.msg : 'Error';
            showToast('SUCCESS', msg);
            dispatch(clearNotification())
        }
    }, [notifications, dispatch])


    return (
        <>
            <Link to="/"
                className={`navbar-brand d-flex align-items-center ${layout}`}
            >
                <div className=" m-3">
                    <h3 >Assignment</h3>
                </div>
            </Link>
            {
                props.location.pathname === '/auth' ?
                    null
                    :
                    <Button
                        variant="contained"
                        className="m-3"
                        color="secondary"
                        size="small"
                        onClick={() => singOutUser()}
                    >
                        Sign out
                    </Button>
            }

        </>
    )
}

export default withRouter(Header);