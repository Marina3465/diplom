import React from 'react';
import './Admin_main.css';

function Admin_main() {
  return (
    <div className='ad_main_header'>
      <img className='ad_main_logo' src={require('../../img/logo1.png')} />

      <select name="journals" id='list-pages'>
        <option value="" >Журналы</option>
        <option value="department">Кафедры</option>
        <option value="students">Студенты</option>
        <option value="directions">Направления</option>
      </select>
      <div className='admin-to-users'>Пользователи</div>

      <div className='admin-to-qr'>Создать QR-код</div>

      <div className='admin-to-account'>Мой аккаунт</div>
      <div className='admin-to-exit'>Выход</div>
    </div>


  )
}

export default Admin_main