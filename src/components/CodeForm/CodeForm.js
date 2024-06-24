import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitCode } from '../../actions/authActions';
import '../LoginForm/LoginForm.css';

const CodeForm = () => {
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const { email, loading, error, codeRequested } = useSelector((state) => state.auth);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(email) {
            dispatch(submitCode(email, code));
        }
    };

    if (!codeRequested) {
        return null; // Скрыть форму кода если email еще не отправлен
    }

    return (
        <div className='login-form'>
            <h2>Enter Code</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Code:
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
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

export default CodeForm;
