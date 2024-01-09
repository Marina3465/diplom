import React, { useEffect, useState } from 'react';
import './Admin_main.css';
import Admin_header from './Admin_header';
const endpoint = 'https://jsonplaceholder.typicode.com/users';


function Admin_main() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      const data = await fetch(endpoint)
        .then(res => res.json())

      setUsers(data)
    })()
  }, [])

  return (
    <><Admin_header />
      <div className='admin-main-search'>
        <input type='text' />
        <button className='button-search'>
          <img src={require('../../img/search.png')} />
        </button>
      </div>

      {users.map(user => (
        <div className='cart' key={user.id}>
          <div className='data'>
            {user.id}
          </div>
          <div className='content'>
            <div className='col1'>
              <p><span>ФИО:</span> {user.name}</p>
              <p><span>Группа:</span> {user.address.suite}</p>
              <p><span>Тип работы:</span> {user.company.name}</p>
              <p><span>Статус:</span> {user.address.zipcode}</p>
            </div>
            <div className='col2'>
              <p><span>Предмет:</span> {user.address.city}</p>
              <p><span>Преподаватель:</span> {user.email}</p>
              <p><span>Кафедра:</span> {user.address.street}</p>
              <p><span>Название:</span> {user.company.catchPhrase}</p>
            </div>
          </div>
        </div>

      ))}
    </>
  )
}

export default Admin_main