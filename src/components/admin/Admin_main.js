import React, { useEffect, useState } from 'react';
import './Admin_main.css';
import Admin_header from './Admin_header';
import { getDataFilters } from '../../network';


function Admin_main() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedWorkType, setSelectedWorkType] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

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
  const [mainData, setMainData] = useState({
    response: {
      count: 30,
      offset: 0,
      journal: [],
      error: null,
      success: true
    }
  })
  const [filteredUsers, setFilteredUsers] = useState({
    response: {
      count: 30,
      offset: 0,
      journal: [],
      error: null,
      success: true
    }
  });
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
    let data = {
      "response": {
        "count": 30,
        "offset": 0,
        "journal": [
          {
            "id": 1,
            "student": {
              "fullName": "Абросимов Ярослав Валерьевич",
              "status": "Учится"
            },
            "group": {
              "id": 1,
              "title": "ИТ2001"
            },
            "discipline": {
              "id": 1,
              "title": "Web"
            },
            "teacher": {
              "id": 1,
              "fullName": "Параскевов Александр Владимирович"
            },
            "work": {
              "id": 1,
              "type": {
                "id": 1,
                "title": "Курсовая работа"
              },
              "registrationDate": 1708552888,
              "title": "Курсовая работа №1"
            }
          },
          {
            "id": 2,
            "student": {
              "fullName": "Кожухар Марина Константиновна",
              "status": "Учится"
            },
            "group": {
              "id": 2,
              "title": "ИТ2002"
            },
            "discipline": {
              "id": 2,
              "title": "Mobile"
            },
            "teacher": {
              "id": 2,
              "fullName": "Василенко Игорь Иванович"
            },
            "work": {
              "id": 2,
              "type": {
                "id": 2,
                "title": "Расчётная работа"
              },
              "registrationDate": 1707074652,
              "title": null
            }
          },
          {
            "id": 3,
            "student": {
              "fullName": "Николаев Данил Станиславович",
              "status": "Отчислен"
            },
            "group": {
              "id": 3,
              "title": "ИТ2003"
            },
            "discipline": {
              "id": 3,
              "title": "Big data"
            },
            "teacher": {
              "id": 3,
              "fullName": "Зубенко Михаил Петрович"
            },
            "work": {
              "id": 3,
              "type": {
                "id": 3,
                "title": "Какая-то работа"
              },
              "registrationDate": 1234567890,
              "title": "Пример работы"
            }
          }
        ]
      },
      "error": null,
      "success": true
    }
    setMainData(data)
    setFilteredUsers(data);
  }, [])


  const getParams = () => {
    console.log('тип работы:', selectedWorkType);
    console.log('дисциплина:', selectedDiscipline);
    console.log('преподаватель:', selectedTeacher);
    console.log('кафедра:', selectedDepartment);
    console.log('группа:', selectedGroup);
  }

  const resetFilters = () => {
    setSelectedWorkType('');
    setSelectedDiscipline('');
    setSelectedTeacher('');
    setSelectedDepartment('');
    setSelectedGroup('');
  };

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = mainData.response.journal.filter(journal =>
      journal.student.fullName.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers({
      response: {
        ...filteredUsers.response,
        journal: filtered
      }
    });
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
        <select value={selectedWorkType} onChange={(e) => setSelectedWorkType(e.target.value)}>
          <option value={''}>Тип работы: </option>
          {filter.response.work_types.map(work_type =>
            <option key={work_type.id} value={work_type.title}>{work_type.title}</option>
          )}
        </select>

        <select value={selectedDiscipline} onChange={(e) => setSelectedDiscipline(e.target.value)}>
          <option value={''}>Дисциплина: </option>
          {filter.response.disciplines.map(discipline =>
            <option key={discipline.id} value={discipline.title}>{discipline.title}</option>
          )}
        </select>
        <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
          <option value={''}>Преподаватель: </option>
          {filter.response.teachers.map(teacher =>
            <option key={teacher.id} value={teacher.fio}>{teacher.fio}</option>
          )}
        </select>
        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value={''}>Кафедра: </option>
          {filter.response.departments.map(department =>
            <option key={department.id} value={department.title}>{department.title}</option>
          )}
        </select>
        <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
          <option value={''}>Группа: </option>
          {filter.response.groups.map(group =>
            <option key={group.id} value={group.title}>{group.title}</option>
          )}
        </select>
        <button className='get-params' type='submit' onClick={getParams}>Применить</button>
        <button className='delete-params' onClick={resetFilters}>Сбросить</button>

      </div>
      {filteredUsers.response.journal.map(journal => (
        <div className='cart' key={journal.id}>
          <div className='data'>
            {new Date(journal.work.registrationDate * 1000).toLocaleString("ru-ru")}
          </div>
          <div className='content'>
            <div className='col1'>
              <p><span>ФИО:</span> {journal.student.fullName}</p>
              <p><span>Группа:</span> {journal.group.title}</p>
              <p><span>Тип работы:</span> {journal.work.type.title}</p>
              <p><span>Статус:</span> {journal.student.status}</p>
            </div>
            <div className='col2'>
              <p><span>Дисциплина:</span> {journal.discipline.title}</p>
              <p><span>Преподаватель:</span> {journal.teacher.fullName}</p>
              <p><span>Кафедра:</span> {journal.teacher.fullName}</p>
              {journal.work.title && <p><span>Название:</span> {journal.work.title}</p>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Admin_main;