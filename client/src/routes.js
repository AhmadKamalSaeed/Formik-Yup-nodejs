import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import MainLayout from './hoc/mainLayout'
import Home from "./components/home";
import Header from "./components/header";
import Auth from "./components/auth";
import { useDispatch, useSelector } from 'react-redux';
import { isAuthUser } from './store/actions/user_actions';
import Dashboard from "./components/dashboard";
import AuthGuard from "./hoc/authGuard";

const Routes = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(isAuthUser())
    }, [dispatch]);

    useEffect(() => {
        if (users.auth !== null) {
                setLoading(false)
        }
    }, [users]);


    return (
        <BrowserRouter>
            <Header />

            {loading ?
                <>loading</>
                :
                <MainLayout>
                    <Switch>
                        <Route exact path="/" component={AuthGuard(Home)} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/dashboard/:id" component={AuthGuard(Dashboard)} />
                    </Switch>
                </MainLayout>
            }


        </BrowserRouter>
    )
}

export default Routes;