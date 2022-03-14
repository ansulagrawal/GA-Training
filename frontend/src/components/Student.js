import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import StudentTable from './StudentTable';
import TableSearch from './TableSearch';
import data from '../mock-data.json';
import AddStudent from './AddStudent';

const colNames = [
  'id',
  'first_name',
  'last_name',
  'email',
  'phone',
  'address',
  'dob',
];

const Student = ({ userDetails }) => {
  const [students, setStudents] = useState(data);
  const [modalType, setModalType] = useState('');
  const [serchStudents, setSerchStudents] = useState(students);

  const [addFormData, setAddFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
  });

  const [editFormData, setEditFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
  });

  const handleEdit = (e, student) => {
    e.preventDefault();
    setModalType('edit');
    const formValues = student;
    setEditFormData(formValues);
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.name;
    console.log(fieldName);
    const fieldValue = e.target.value;
    console.log(fieldValue);
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleEditFromSumbit = (e) => {
    e.preventDefault();
    const editedStudent = {
      id: editFormData.id,
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      email: editFormData.email,
      phone: editFormData.phone,
      address: editFormData.address,
      dob: editFormData.dob,
    };

    const newStudents = [...students];

    const index = students.findIndex(
      (student) => student.id === editFormData.id
    );

    newStudents[index] = editedStudent;

    setStudents(newStudents);
  };

  const handleDelete = (e, stud) => {
    e.preventDefault();
    const newStudents = [...students];
    const index = students.findIndex((student) => student.id === stud.id);
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };
  const handleAddFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: nanoid(),
      first_name: addFormData.first_name,
      last_name: addFormData.last_name,
      email: addFormData.email,
      phone: addFormData.phone,
      address: addFormData.address,
      dob: addFormData.dob,
    };
    const newStudents = [...students, newStudent];
    setStudents(newStudents);
  };

  return (
    <div
      style={{
        display: 'flex',
        margin: '20vh auto',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '95%',
      }}
    >
      <div className='d-flex justify-content-end'>
        <AddStudent
          modalType={modalType}
          updateModalType={setModalType}
          handleAddFormChange={handleAddFormChange}
        />
        <TableSearch data={students} updateList={setSerchStudents} />
      </div>
      <StudentTable
        list={serchStudents}
        colNames={colNames}
        updateDetails={setStudents}
        handleEdit={handleEdit}
        editData={editFormData}
        editOnChange={handleEditFormChange}
        editFormSumbit={handleEditFromSumbit}
        handleDelete={handleDelete}
        userDetails={userDetails}
        modalType={modalType}
        addOnChange={handleAddFormChange}
        addFormSumbit={handleAddFormSubmit}
        addData={addFormData}
      />
    </div>
  );
};

export default Student;
