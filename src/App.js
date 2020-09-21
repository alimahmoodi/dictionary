import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import FormBuilder from "./containers/formBuilder/formBuilder";
import Search from "./containers/search/search";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import SignUp from "./containers/auth/signup";
import Logout from "./containers/auth/logout";
import Login from "./containers/auth/login";
import { connect } from "react-redux";
import { authStateCheck } from "./store/actionCreators";

function App(props) {
    const { checkAuth, isAuth } = props;
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    let route = (
        <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" exact component={Login} />
            <Redirect to="/" />
        </Switch>
    );

    if (isAuth) {
        route = (
            <Switch>
                <Route path="/search" exact component={Search} />
                <Route path="/EnterByMe" exact component={FormBuilder} />
                <Route path="/logout" exact component={Logout} />
                <Redirect to="/EnterByMe" />
            </Switch>
        );
    }
    return <Layout>{route}</Layout>;
}
const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(authStateCheck()),
    };
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.token !== null,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
