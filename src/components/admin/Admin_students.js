import React, { useState, useEffect } from 'react';
import Admin_header from './Admin_header';

const endpoint = 'https://jsonplaceholder.typicode.com/users';

function Admin_students() {
    const [modalActive, setModalActive] = useState(false);
    const [userStates, setUserStates] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                setAllUsers(data);
                setFilteredUsers(data);

                const initialUserStates = {};
                data.forEach(user => {
                    initialUserStates[user.id] = false;
                });
                setUserStates(initialUserStates);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        const filtered = allUsers.filter(user =>
            user.address.street.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleSettingClick = (userId) => {
        setUserStates(prevUserStates => ({
            ...prevUserStates,
            [userId]: !prevUserStates[userId],
        }));
    };
    return (
        <>
            <Admin_header />
            <div className='admin-main-search'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder='Поиск по имени...'
                />
            </div>
            <div className='filters'>
                <select>
                    <option value={''}>Группа: </option>
                    {allUsers.map(user =>
                        <option key={user.id} value={user.company.name}>{user.company.name}</option>
                    )}
                </select>
                <select>
                    <option value={''}>Направление: </option>
                    {allUsers.map(user =>
                        <option key={user.id} value={user.address.city}>{user.address.city}</option>
                    )}
                </select>
                <select>
                    <option value={''}>Программа: </option>
                    {allUsers.map(user =>
                        <option key={user.id} value={user.email}>{user.email}</option>
                    )}
                </select>
                
            </div>
            {filteredUsers.map(user => (
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
                            <p><span>Дисциплина:</span> {user.address.city}</p>
                            <p><span>Преподаватель:</span> {user.email}</p>
                            <p><span>Кафедра:</span> {user.address.street}</p>
                            <p><span>Название:</span> {user.company.catchPhrase}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>

    );
}

export default Admin_students;