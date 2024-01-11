import '../admin/Admin_department.css';
import React, { useEffect, useState } from 'react';
import Admin_header from './Admin_header';

const endpoint = 'https://jsonplaceholder.typicode.com/users';

function Admin_department() {
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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredUsers(filtered);
    };
    return (
        <>
            <Admin_header />
            <div className='admin-main-search'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder='Поиск по названию...'
                />
            </div>
            {filteredUsers.map(user => (
                <div className='cart' key={user.id}>
                    <div className='data'>
                        <p><span>Кафедра: </span>{user.address.street}</p>
                    </div>
                    
                    
                </div>
            ))}
        </>
    )
}

export default Admin_department