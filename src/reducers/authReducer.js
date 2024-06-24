import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CODE_REQUEST_SUBMITTED, LOGOUT } from '../actions/authActions';

const initialState = {
    loading: false,
    isLoggedIn: false,
    user: null,
    error: null,
    email: null,
    codeRequested: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, isLoggedIn: true, codeRequested: false };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CODE_REQUEST_SUBMITTED:
            return { ...state, loading: false, codeRequested: true, email: action.payload };
        case LOGOUT:
            return { ...state, isLoggedIn: false, user: null, codeRequested: false };
        default:
            return state;
    }
};

export default authReducer;
