import api from '../api/axios';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CODE_REQUEST_SUBMITTED = 'CODE_REQUEST_SUBMITTED';
export const CODE_REQUEST = 'CODE_REQUEST';
export const LOGOUT = 'LOGOUT';

// Action Creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });
const codeRequestSubmitted = (email) => ({ type: CODE_REQUEST_SUBMITTED, payload: email });

export const login = (email) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        await api.post('auth/login', { email });
        dispatch(codeRequestSubmitted(email));
    } catch (error) {
        dispatch(loginFailure(error.response.data.message));
        alert(error.response.data.message)
    }
};

export const submitCode = (email, code) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await api.post('/auth/confirm', { email, code });
        dispatch(loginSuccess());
        // Сохранение токена (например, в localStorage)
        localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
        dispatch(loginFailure(error.response.data.message));
        alert(error.response.data.message)
    }
};

export const logout = () => (dispatch) => {
    // Очистка данных
    localStorage.removeItem('accessToken');
    dispatch({ type: LOGOUT });
};
