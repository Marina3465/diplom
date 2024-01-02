import React, { useState } from 'react';
import './Log.css';


function Log() {
    const mess = () => {
        alert('Позвоните по номеру телефона: +7 (000) 000-00-00');
    }


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword= (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className='conteiner'>
            <form>
                <div className='img-conteiner'>
                    <img src={require('./img/logo.png')} alt='Логотип КубГАУ' />
                </div>

                <input type='email' placeholder='E-mail' value={email} onChange={onChangeEmail}></input>
                <input type='password' placeholder='Пароль' value={password} onChange={onChangePassword}></input>
                <span onClick={mess}>Забыли пароль?</span>
                <input type='submit' value='Войти'></input>
            </form>
            <div>Email: {email}</div>
            <div>Password: {password}</div>
        </div>


    );
}

export default Log;