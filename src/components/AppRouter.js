import { useEffect, useState } from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Home from '../pages/Home'
import { HOME_ROUTE } from "../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { authRoutes, publicRoutes } from "../utils/routes";
import { checkAuth } from '../store/actions/userActions'

function AppRouter() {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.userReducer)

    return (
        <Switch>
            {
                isLoggedIn ?
                    authRoutes.map(route => (
                        <Route key={route.path} path={route.path} component={route.component} exact />
                    ))
                    :
                    publicRoutes.map(route => (
                        <Route key={route.path} path={route.path} component={route.component} exact />
                    ))
            }
            <Redirect from='*' to='/' />
        </Switch>
    );
}

export default AppRouter;