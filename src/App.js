import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './components/LoginForm/LoginForm';
import CodeForm from './components/CodeForm/CodeForm';
import { loginSuccess } from './actions/authActions'
import './App.css';

const App = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        <div className="App">
            {isLoggedIn ? (
                <h2>Welcome to the Admin Panel</h2>
            ) : (
                <>
                    <LoginForm />
                    <CodeForm />
                </>
            )}
        </div>
    );
};

export default App;
