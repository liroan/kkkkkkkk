import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authActions';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading, error, codeRequested } = useSelector((state) => state.auth);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(email));
    };

    if (codeRequested) {
        return null; // Скрыть форму входа после отправки email
    }

    return (
        <div className='login-form'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div >
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Отправить'}
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginForm;
