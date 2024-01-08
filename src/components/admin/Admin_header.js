import React, { useState } from 'react';
import './Admin_header.css';

function Admin_header() {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className='ad_main_header'>
            <img className='ad_main_logo' src={require('../../img/logo1.png')} />
            <button className='menu_button' onClick={() => setOpen(!isOpen)}>Журналы
                <img className={`button_arrow ${isOpen ? "active" : ""}`} src={require('../../img/nav arrow.png')} />
            </button>
            <nav className={`menu ${isOpen ? "active" : ""}`}>
                <ul className='menu_list'>
                    <li className='menu_item'>Кафедры</li>
                    <li className='menu_item'>Студенты</li>
                    <li className='menu_item'>Направления</li>
                </ul>
            </nav>

            <div className='admin-to-users'>Пользователи</div>

            <div className='admin-to-qr'>
                <p>Создать QR-код</p>
                <img className='qr-arrow' src={require('../../img/arrow.png')} />

            </div>

            <div className='admin-to-account'>Мой аккаунт</div>
            <div className='admin-to-exit'>Выход</div>
        </div>

    )
}

export default Admin_header