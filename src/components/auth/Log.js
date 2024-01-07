import './Log.css';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
//import { Link } from "react-router-dom"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlah = <FontAwesomeIcon icon={faEyeSlash} />;


function Log() {
    const mess = () => {
        alert('Позвоните по номеру телефона: +7 (000) 000-00-00');
    }
    const { register, handleSubmit, formState: { errors }, reset, watch, getValues } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {

        setPasswordShown(passwordShown ? false : true);

    };
    const toggleConfPasswordVisiblity = () => {
        setConfPasswordShown(confirmPasswordShown ? false : true);

    };
    return (
        <div className='conteiner'>
            <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='img-conteiner'>
                    <img src={require('../../img/logo.png')} alt='Логотип КубГАУ' />
                </div>

                <input className='auth-email auth-input' type="email" placeholder='Почта' {...register("email", {
                            required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })} /><br></br>
                        {errors.email && <p className='auth-error'>Не корректный ввод почты</p>}

                        <div className='passw-eye'><input className='auth-input auth-pass' type={passwordShown ? "text" : "password"} placeholder='Пароль' {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/ })} /><i onClick={togglePasswordVisiblity}>{passwordShown ? eyeSlah : eye}</i></div>
                        {errors.password && <p className='auth-error'>Неверный пароль</p>}
                <div className='forgot_pass' onClick={mess}>Забыли пароль?</div>
                <div><input className='auth-submit' type='submit' value='Войти'></input></div>
            </form>

        </div>


    );
}

export default Log;