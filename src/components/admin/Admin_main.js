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

  // const [filter, setFilter] = useState({
  //   response: {
  //     workTypes: [],
  //     disciplines: [],
  //     teachers: [],
  //     groups: []
  //   },
  //   error: null,
  //   success: true
  // });
  const [filter, setFilter] = useState()
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
    getDataFilters().then((resp) => {
      setFilter(resp.data);
    });
  }, []);


  useEffect(() => {
    let data = {
      "response": {
        "count": 30,
        "offset": 0,
        "journal": [
          {

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
          <option value={'null'}>Тип работы: </option>
          {filter.response.workTypes.map(workTypes =>
            <option key={workTypes.id} value={workTypes.title}>{workTypes.title}</option>
          )}
        </select>

        <select value={selectedDiscipline} onChange={(e) => setSelectedDiscipline(e.target.value)}>
          <option value={'null'}>Дисциплина: </option>
          {filter.response.disciplines.map(disciplines =>
            <option key={disciplines.id} value={disciplines.title}>{disciplines.title}</option>
          )}
        </select>
        <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
          <option value={'null'}>Преподаватель: </option>
          {filter.response.teachers.map(teachers =>
            <option key={teachers.id} value={teachers.firstName}>{teachers.firstName}</option>
          )}
        </select>
        {/* <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value={''}>Кафедра: </option>
          {filter.response.departments.map(department =>
            <option key={department.id} value={department.title}>{department.title}</option>
          )}
        </select> */}
        <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
          <option value={'null'}>Группа: </option>
          {filter.response.groups.map(groups =>
            <option key={groups.id} value={groups.title}>{groups.title}</option>
          )}
        </select>
        <button className='get-params' type='submit' onClick={getParams}>Применить</button>
        <button className='delete-params' onClick={resetFilters}>Сбросить</button>

      </div>
      {filteredUsers.response.journal.map(journal => (
        <div className='cart' /*key={journal.id}*/>
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