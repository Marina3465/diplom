import './Log.css';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
//import { Link } from "react-router-dom"; 
import { checkAccount, login } from "../../network"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, redirect } from 'react-router-dom';
import Choice from '../admin/Choice';
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlah = <FontAwesomeIcon icon={faEyeSlash} />;


function Log() {
    const mess = () => {
        alert('Позвоните по номеру телефона: +7 (000) 000-00-00');
    }
    const { register, handleSubmit, formState: { errors }, reset, watch, getValues } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        login(data).then((res) => {
            console.log(res)
            if (res.success) {
                let token = res.response.access_token
                localStorage.setItem('access_token', token)
                window.location.reload()
                
            } else {
                alert('Не верные данные')
            }
        })
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {

        setPasswordShown(passwordShown ? false : true);

    };
    // const toggleConfPasswordVisiblity = () => {
    //     setConfPasswordShown(confirmPasswordShown ? false : true);

    // };
    return (
        <div className='conteiner'>
            <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='img-conteiner'>
                    <img src={require('../../img/logo.png')} alt='Логотип КубГАУ' />
                </div>

                <input className='auth-email auth-input' type="email" placeholder='Почта' {...register("login", {
                    required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })} /><br></br>
                {errors.email && <p className='auth-error'>Не корректный ввод почты</p>}

                <div className='passw-eye'><input className='auth-input auth-pass' type={passwordShown ? "text" : "password"} placeholder='Пароль' {...register("password")} /><i onClick={togglePasswordVisiblity}>{passwordShown ? eyeSlah : eye}</i></div>
                {/* <p className={`auth-error ${login(data).then((res) => {res.success}) ? 'hide' : ''}`}>Неверный пароль</p> */}
                <div className='forgot_pass' onClick={mess}>Забыли пароль?</div>
                <div><input className='auth-submit' type='submit' value='Войти'></input></div>
            </form>

        </div>


    );
}

export default Log;