import * as actionType from "./actionTypes";
import Axios from "axios";

export const authStart = () => {
    return {
        type: actionType.AUTH_START,
    };
};

export const authFailLogin = (error) => {
    return {
        type: actionType.AUTH_FAIL_LOGIN,
        error: error,
    };
};
export const authFailSignup = (error) => {
    return {
        type: actionType.AUTH_FAIL_SIGNUP,
        errorSignup: error,
    };
};
export const signupErrorClose = () => {
    return {
        type: actionType.SIGNUP_ERROR_CLOSE,
    };
};

export const loginErrorClose = () => {
    return {
        type: actionType.LOGIN_ERROR_CLOSE,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        userId: userId,
        idToken: token,
    };
};
export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expireDate");
    return {
        type: actionType.AUTH_LOGOUT,
    };
};
export const checkAuthTimeOut = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logOut());
        }, expiresIn * 1000);
    };
};
export const redirect = () => {
    return {
        type: actionType.REDIRECT,
        path: "/EnterByMe",
    };
};

export const verification = (token) => {
    return (dispatch) => {
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAGPZqC46mQtp3HeMO7K0QjtqfSAyaEAiM";
        Axios.post(url, {
            requestType: "VERIFY_EMAIL",
            idToken: token,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const auth = (email, password, type) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url;
        if (type === "signup") {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGPZqC46mQtp3HeMO7K0QjtqfSAyaEAiM";
        } else {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGPZqC46mQtp3HeMO7K0QjtqfSAyaEAiM";
        }

        Axios.post(url, authData)
            .then((response) => {
                const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                console.log(response);
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                localStorage.setItem("expireDate", expireDate);
                if (type === "signup") {
                    dispatch(verification(response.data.idToken));
                }
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
                dispatch(redirect());
            })
            .catch((err) => {
                console.log(err);
                if (type === "signup") {
                    console.log("signup");
                    dispatch(authFailSignup(err.response.data.error.message));
                } else {
                    console.log("login");
                    dispatch(authFailLogin(err.response.data.error.message));
                }
            });
    };
};

export const authStateCheck = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token) {
            dispatch(logOut());
        } else {
            const expireDate = new Date(localStorage.getItem("expireDate"));

            if (expireDate > new Date()) {
                dispatch(authSuccess(token, userId));
                const expireTime = (expireDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeOut(expireTime));
            } else {
                dispatch(logOut());
            }
        }
    };
};
