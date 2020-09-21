import React, { useState } from "react";

import TextInput from "../../components/UI/Input/textInput/textInput";
import classes from "./login.module.css";
import { connect } from "react-redux";
import { auth, loginErrorClose } from "../../store/actionCreators";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../../components/UI/spinner/spinner";
import Register from "./register/register";
import cross from "../../svg/close-black.svg";

const Auth = (props) => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const submitAuth = (e) => {
        e.preventDefault();
        props.onAuth(emailValue, passwordValue);
    };
    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to="/EnterByMe" />;
    }
    return (
        <Register>
            <div className={classes.AuthContainer}>
                {authRedirect}
                <h1 className={classes.Header}>log in</h1>
                <form onSubmit={submitAuth}>
                    <TextInput
                        placeholder="Email"
                        onChangeOfTextInput={(e) => setEmailValue(e.target.value)}
                        textInputValue={emailValue}
                    />
                    <TextInput
                        placeholder="PassWord"
                        onChangeOfTextInput={(e) => setPasswordValue(e.target.value)}
                        textInputValue={passwordValue}
                        typeOfInput="password"
                    />
                    <button className={classes.SubmitButton}>
                        <span>login</span>
                        {props.loading ? <Spinner /> : null}
                    </button>

                    <p className={classes.CreateAccount}>
                        <span>you don't have an account?</span>
                        {<Link to="/signup">sign up</Link>}
                    </p>

                    {props.errorLogin ? (
                        <div className={classes.ErrorMessage}>
                            <img
                                onClick={props.onCloseError}
                                className={classes.crossClose}
                                src={cross}
                            />
                            {props.errorLogin}
                        </div>
                    ) : null}
                </form>
            </div>
        </Register>
    );
};

const mapDispatchToProp = (dispatch) => {
    return {
        onAuth: (emailValue, passwordValue) => dispatch(auth(emailValue, passwordValue)),
        onCloseError: () => dispatch(loginErrorClose()),
    };
};
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        errorLogin: state.errorLogin,
        isAuth: state.token !== null,
        redirectPath: state.redirect,
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(Auth);
