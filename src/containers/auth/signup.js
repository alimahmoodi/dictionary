import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import TextInput from "../../components/UI/Input/textInput/textInput";
import classes from "./login.module.css";
import { connect } from "react-redux";
import { auth, signupErrorClose } from "../../store/actionCreators";
import Spinner from "../../components/UI/spinner/spinner";
import Register from "./register/register";
import { Link } from "react-router-dom";
import tick from "../../svg/tick1.svg";
import cross from "../../svg/close-black.svg";
const SignUp = (props) => {
    const [emailValue, setEmailValue] = useState("");
    const [passValue1, setPassValue1] = useState("");
    const [passValue2, setPassValue2] = useState("");
    const [pass1Touched, setPass1Touched] = useState(false);
    const [pass2Touched, setPass2Touched] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [passShort, checkPassShort] = useState(false);

    useEffect(() => {
        let checkValidity = true;
        if (passValue1.trim() !== passValue2.trim()) {
            setIsValid(false);
        }
        if (passValue1 === passValue2 && passValue1.trim() !== "" && passValue2.trim() !== "") {
            if (passValue1.length < 7) {
                setIsValid(false);
                checkPassShort(true);
            } else {
                setIsValid(true);
                checkPassShort(false);
            }
        }
    }, [pass1Touched, passValue1, passValue2]);

    function onChangeOfPass1(value) {
        setPassValue1(value);
        setPass1Touched(true);
    }
    function onChangeOfPass2(value) {
        setPassValue2(value);
        setPass2Touched(true);
    }

    const submitAuth = (e) => {
        e.preventDefault();

        if (isValid) {
            props.onAuth(emailValue, passValue2);
        }
    };
    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to="/EnterByMe" />;
    }
    return (
        <Register>
            <div className={classes.AuthContainer}>
                {authRedirect}
                <h1 className={classes.Header}>create account</h1>
                <form onSubmit={submitAuth}>
                    <div className={classes.Input}>
                        <label>Email:</label>
                        <TextInput
                            placeholder="Email"
                            onChangeOfTextInput={(e) => setEmailValue(e.target.value)}
                            textInputValue={emailValue}
                            typeOfInput="email"
                        />
                    </div>

                    <div className={classes.Input}>
                        <label>Password:</label>
                        <TextInput
                            placeholder="PassWord"
                            onChangeOfTextInput={(e) => onChangeOfPass1(e.target.value)}
                            textInputValue={passValue1}
                            typeOfInput="password"
                            wordIsValid={!passShort}
                            wordIsTouched={pass1Touched}
                        />
                        {passShort ? (
                            <div
                                style={{
                                    color: "red",
                                    textTransform: "capitalize",
                                    fontWeight: "200",
                                    marginTop: "10px",
                                }}
                            >
                                password must at least 7 characters
                            </div>
                        ) : null}
                        {/* <img className={classes.Tick} src={tick} /> */}
                    </div>
                    <div className={classes.Input}>
                        <label>Rewrite Password:</label>
                        <TextInput
                            placeholder="Rewrite PassWord"
                            onChangeOfTextInput={(e) => onChangeOfPass2(e.target.value)}
                            textInputValue={passValue2}
                            wordIsTouched={pass2Touched}
                            wordIsValid={isValid}
                            typeOfInput="password"
                        />

                        {isValid ? <img className={classes.Tick} src={tick} /> : null}
                    </div>

                    <button className={classes.SubmitButton}>
                        <span>SignUp</span>
                        {props.loading ? <Spinner /> : null}
                    </button>
                    <p className={classes.CreateAccount}>
                        <span>you have account?</span>
                        {<Link to="/">log in</Link>}
                    </p>
                    {props.errorSignup ? (
                        <div className={classes.ErrorMessage}>
                            <img
                                onClick={props.onCloseError}
                                className={classes.crossClose}
                                src={cross}
                            />
                            {props.errorSignup}
                        </div>
                    ) : null}
                </form>
            </div>
        </Register>
    );
};

const mapDispatchToProp = (dispatch) => {
    return {
        onAuth: (emailValue, passwordValue) => dispatch(auth(emailValue, passwordValue, "signup")),
        onCloseError: () => dispatch(signupErrorClose()),
    };
};
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        errorSignup: state.errorSignup,
        isAuth: state.token !== null,
    };
};
export default connect(mapStateToProps, mapDispatchToProp)(SignUp);
