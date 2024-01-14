import React, { useEffect, useState } from 'react';
import Admin_header from './Admin_header';
import './Admin_department.css'
import Modal from '../Modal/Modal';

const endpoint = 'https://jsonplaceholder.typicode.com/users';

function Admin_department() {
    const [modalActive, setModalActive] = useState(true);
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
            <div className='search-add'>
                <div className='admin-main-search'>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder='Поиск по названию...'
                    />
                </div>
                <button className='add-department' onClick={() => setModalActive(true)}>
                    <img src={require('../../img/add.png')} alt='add' />
                </button>
            </div>

            {filteredUsers.map(user => (
                <div className='cart-department' key={user.id}>
                    <div className='data-department'>
                        <p><span>Кафедра: </span>{user.address.street}</p>
                    </div>
                    <button
                        className='department-setting'
                        onClick={() => handleSettingClick(user.id)}
                    >
                        <img src={require('../../img/setting.png')} alt='setting' />
                    </button>
                    <div className={`button-edit-delete ${userStates[user.id] ? 'active' : ''}`}>
                        <button>
                            <img src={require('../../img/edit.png')} alt='edit' />
                        </button>
                        <button>
                            <img src={require('../../img/delete.png')} alt='delete' />
                        </button>
                    </div>
                </div>
            ))}
            <Modal active={modalActive} setActive={setModalActive}>
                <div className='modal-department'>
                    <label for='name-dapartment'>Название кафедры</label>
                    <input type='text' className='name-dapartment' />
                    <label for='name-dapartment'>Номер телефона</label>
                    <input type='text' className='phone-dapartment' />
                </div>
            </Modal>
        </>
    )
}

export default Admin_department;
