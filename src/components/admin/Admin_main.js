import React, { useEffect, useState } from 'react';
import './Admin_main.css';
import Admin_header from './Admin_header';
import { getDataFilters } from '../../network';
import { getDataAdminJournal } from '../../network';
import Select from 'react-select/dist/declarations/src/Select';

function Admin_main() {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedWorkType, setSelectedWorkType] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const [filter, setFilter] = useState({
        response: {
            workTypes: [],
            disciplines: [],
            teachers: [],
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
        getDataFilters((res) => {
            setFilter(res)
        })
    }, []);

    const resetFilters = () => {

        setSelectedWorkType(null);
        setSelectedDiscipline(null);
        setSelectedTeacher(null);
        setSelectedDepartment(null);
        setSelectedGroup(null);
        console.log('тип работы:', selectedWorkType);
        console.log('дисциплина:', selectedDiscipline);
        console.log('преподаватель:', selectedTeacher);
        console.log('кафедра:', selectedDepartment);
        console.log('группа:', selectedGroup);
    };

    const getParams = () => {
        console.log('тип работы:', selectedWorkType);
        console.log('дисциплина:', selectedDiscipline);
        console.log('преподаватель:', selectedTeacher);
        console.log('кафедра:', selectedDepartment);
        console.log('группа:', selectedGroup);


        const journalParam = {
            disciplineId: selectedDiscipline,
            teacherId: selectedTeacher,
            departmentId: selectedDepartment,
            groupId: selectedGroup,
            workTypeId: selectedWorkType
        }

        getDataAdminJournal(journalParam, (data) => {
            setMainData(data)
            setFilteredUsers(data);
        })
    }

    useEffect(() => {

        const journalParam = {
            disciplineId: null,
            teacherId: null,
            departmentId: null,
            groupId: null,
            workTypeId: null
        }
        getDataAdminJournal(journalParam, (data) => {
            setMainData(data)
            setFilteredUsers(data);
        })

        // console.log(journalParam)
    }, []);




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
    const [selectedOptions, setSelectedOptions] = useState();
    const optionList = [
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "blue", label: "Blue" },
        { value: "white", label: "White" }
    ];
    function handleSelect(data) {
        setSelectedOptions(data);
    }

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

                <Select
                    options={optionList}
                    placeholder="Select color"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                />


                <select value={selectedWorkType} onChange={(e) => setSelectedWorkType(e.target.value)}>
                    <option value={null}>Тип работы: </option>
                    {filter.response.workTypes.map(workTypes =>
                        <option key={workTypes.id} value={workTypes.id}>{workTypes.title}</option>
                    )}
                </select>

                <select value={selectedDiscipline} onChange={(e) => setSelectedDiscipline(e.target.value)}>
                    <option value={null}>Дисциплина: </option>
                    {filter.response.disciplines.map(disciplines =>
                        <option key={disciplines.id} value={disciplines.id}>{disciplines.title}</option>
                    )}
                </select>
                <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                    <option value={null}>Преподаватель: </option>
                    {filter.response.teachers.map(teachers =>
                        <option key={teachers.id} value={teachers.id}>{teachers.lastName} {teachers.firstName} {teachers.middleName}</option>
                    )}
                </select>
                {/* <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value={''}>Кафедра: </option>
          {filter.response.departments.map(department =>
            <option key={department.id} value={department.title}>{department.title}</option>
          )}
        </select> */}
                <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value={null}>Группа: </option>
                    {filter.response.groups.map(groups =>
                        <option key={groups.id} value={groups.id}>{groups.title}</option>
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
                            <p><span>Преподаватель:</span> {journal.teacher.lastName} {journal.teacher.firstName} {journal.teacher.middleName}</p>
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
