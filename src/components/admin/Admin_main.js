import React, { useEffect, useState } from 'react';
import './Admin_main.css';
import Admin_header from './Admin_header';
import { getDataFilters } from '../../network';

const endpoint = 'https://jsonplaceholder.typicode.com/users';

function Admin_main() {
  const [allUsers, setAllUsers] = useState([]);
  const [filter, setFilter] = useState({
    response: {
      work_types: [],
      disciplines: [],
      teachers: [],
      departments: [],
      groups: []
    },
    error: null,
    success: true
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilter({
      "response": {
        "work_types": [
          {
            "id": 1,
            "title": "Курсовая работа"
          },
          {
            "id": 2,
            "title": "Расчётная работа"
          },
          {
            "id": 3,
            "title": "Какая-то работа"
          }
        ],
        "disciplines": [
          {
            "id": 1,
            "title": "Web"
          },
          {
            "id": 2,
            "title": "Mobile"
          },
          {
            "id": 3,
            "title": "Big Data"
          },
          {
            "id": 4,
            "title": "Algorithms and data structures"
          },
          {
            "id": 5,
            "title": "Microelectronics"
          }
        ],
        "teachers": [
          {
            "id": 1,
            "fio": "Параскевов Александр Владимирович"
          },
          {
            "id": 2,
            "fio": "Василенко Игорь Иванович"
          },
          {
            "id": 3,
            "fio": "Зубенко Михаил Петрович"
          },
          {
            "id": 4,
            "fio": "Тарас Бульба"
          }
        ],
        "departments": [
          {
            "id": 1,
            "title": "Компьютерных технологий и систем"
          },
          {
            "id": 2,
            "title": "Информационных систем"
          },
          {
            "id": 3,
            "title": "Экономической кибернетики"
          },
          {
            "id": 4,
            "title": "Системного анализа и обработки информации"
          }
        ],
        "groups": [
          {
            "id": 1,
            "title": "ИТ2001"
          },
          {
            "id": 2,
            "title": "ИТ2002"
          },
          {
            "id": 3,
            "title": "ИТ2003"
          }
        ]
      },
      "error": null,
      "success": true

    });


  }, [])


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
          placeholder='Поиск по имени...'
        />
      </div>
      <div className='filters'>
        <select>
          <option value={''}>Тип работы: </option>
          {filter.response.work_types.map(work_type =>
            <option key={work_type.id} value={work_type.title}>{work_type.title}</option>
          )}
        </select>
        <select>
          <option value={''}>Дисциплина: </option>
          {filter.response.disciplines.map(discipline =>
            <option key={discipline.id} value={discipline.title}>{discipline.title}</option>
          )}
        </select>
        <select>
          <option value={''}>Преподаватель: </option>
          {filter.response.teachers.map(teacher =>
            <option key={teacher.id} value={teacher.fio}>{teacher.fio}</option>
          )}
        </select>
        <select>
          <option value={''}>Кафедра: </option>
          {filter.response.departments.map(department =>
            <option key={department.id} value={department.title}>{department.title}</option>
          )}
        </select>
        <select>
          <option value={''}>Группа: </option>
          {filter.response.groups.map(group =>
            <option key={group.id} value={group.title}>{group.title}</option>
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

export default Admin_main;