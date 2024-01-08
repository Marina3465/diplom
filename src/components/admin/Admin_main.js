import React, { useEffect, useState } from 'react';
import './Admin_main.css';
import Admin_header from './Admin_header';
// import employee from '../../employee.json'
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name (Username)</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name} ({user.username})</td>
              <td>
                <a href={`mailto:${user.email}`}>
                  {user.email}
                </a>
              </td>
              <td>{user.phone}</td>
              <td>
                <a href={`https://${user.website}`} target="_blank">
                  {user.website}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Admin_main