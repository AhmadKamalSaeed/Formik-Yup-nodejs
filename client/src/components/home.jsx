import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../store/actions/user_actions'
import { Link } from 'react-router-dom';
import {
    Button
} from '@material-ui/core';

export default function Home() {
    // const [user, setUser] = useReducer((state, newState) => ({ ...state, newState }),
    //     initialState);
    const users = useSelector(state => state.users)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("dfs")
        if (users && !users.users) {
            ///dispatch 
            dispatch(getUsers())
        }

    }, [dispatch, users])
    // console.log(Array.isArray(users.users.users))


    const showUsers = (users) => {
        return (
            users.users.users.map(item => (
                <>
                    <tr className="mt-3" >
                        <td style={{ paddingRight: '7rem' }}>{item.email}</td>
                        <td style={{ paddingLeft: '7rem' }}>{item.firstname}</td>
                        <td style={{ paddingLeft: '7rem' }}>{item.lastname}</td>
                    </tr>
                    <br />
                </>
            )

            )
        )
    }
    return (
        <div>

            <table className='mt-2'>
                <thead>
                    <tr>
                        <th style={{ paddingRight: '70px' }}>
                            Email
                        </th>
                        <th style={{ paddingLeft: '7rem' }}>
                            First Name
                        </th>
                        <th style={{ paddingLeft: '7rem' }}>
                            Last Name
                        </th>
                    </tr>
                    <br />
                </thead>
                <tbody id="User_tabel">

                    {
                        users.users !== undefined
                            ?
                            showUsers(users)
                            : null
                    }
                </tbody>
            </table>
            <Button variant="contained"
                className="mt-3"
                color="primary"
                size="small"
            >

                <Link style={{ textDecoration: 'none', color: 'white' }} to={`/dashboard/${users.data._id}`}>
                    Edit your info
                </Link>
            </Button>
        </div>
    )
}
