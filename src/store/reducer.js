import * as actionType from "./actionTypes";

const initialState = {
    userId: null,
    token: null,
    loading: false,
    errorLogin: null,
    errorSignup: null,
    redirect: "/",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case actionType.AUTH_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                userId: action.userId,
                token: action.idToken,
                errorLogin: null,
                errorSignup: null,
            };
        }
        case actionType.AUTH_FAIL_LOGIN: {
            return {
                ...state,
                loading: false,
                errorLogin: action.error,
            };
        }
        case actionType.AUTH_FAIL_SIGNUP: {
            return {
                ...state,
                loading: false,
                errorSignup: action.errorSignup,
            };
        }

        case actionType.SIGNUP_ERROR_CLOSE: {
            return {
                ...state,
                errorSignup: null,
            };
        }
        case actionType.LOGIN_ERROR_CLOSE: {
            return {
                ...state,
                errorLogin: null,
            };
        }
        case actionType.AUTH_LOGOUT: {
            return {
                ...state,
                userId: null,
                token: null,
            };
        }
        case actionType.REDIRECT: {
            return {
                ...state,
                redirect: action.path,
            };
        }
        default:
            return state;
    }
};
export default reducer;
