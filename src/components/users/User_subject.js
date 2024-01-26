import React, {useState, useEffect} from 'react';
import User_header from './User_header';

const endpoint = 'https://jsonplaceholder.typicode.com/users';

function User_subject() {

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
            user.name.toLowerCase().includes(e.target.value.toLowerCase())
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
            <User_header />
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
                <div className='cart-stud' key={user.id}>
                    {/* <div className='data'>
                        {user.id}
                    </div> */}
                    <div className='content'>
                        <div className='col1'>
                            <p><span>Название:</span> {user.name}</p>
                            <p><span>Программа:</span> {user.address.suite}</p>
                            <p><span>Семестр:</span> {user.company.name}</p>
                        </div>
                        <div className='col2'>
                            <p><span>Преподаватели:</span> {user.address.city}</p>

                        </div>
                    </div>
                    <button
                        className='student-setting'
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
        </>);
}

export default User_subject;