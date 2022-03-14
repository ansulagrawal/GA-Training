import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
const StudentTable = ({
  list,
  colNames,
  userDetails,
  editData,
  handleEdit,
  editOnChange,
  editFormSumbit,
  handleDelete,
  modalType,
  addData,
  addOnChange,
  addFormSumbit,
}) => {
  return (
    <div className='container-fluid'>
      <Modal
        colNames={colNames}
        editDetails={editData}
        editOnChange={editOnChange}
        editFormSumbit={editFormSumbit}
        modalType={modalType}
        addDetails={addData}
        addOnChange={addOnChange}
        addFormSumbit={addFormSumbit}
      />
      <div className='d-flex justify-content-center'>
        {list.length > 0 && (
          <table className='table table-striped table-hover w-100 text-center'>
            <thead style={{ backgroundColor: '#56ebb2' }}>
              <tr>
                {colNames.map((colName, index) => (
                  <th key={index}>{colName.toUpperCase()}</th>
                ))}
                <th key='999'>View Profile</th>
                <th key='1000'>Insert / Delete</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(list).map((student, index) => (
                <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                  {Object.values(student).map((val, index2) => (
                    <td key={index2}>{val}</td>
                  ))}
                  <td key='999'>
                    <Link to='/student/profile'>
                      <button
                        className='border-0 bg-transparent'
                        onClick={() => {
                          userDetails(student);
                        }}
                      >
                        View
                      </button>
                    </Link>
                  </td>
                  <td key='1000'>
                    <button
                      className='border-0 bg-transparent'
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop'
                      onClick={(e) => {
                        handleEdit(e, student);
                      }}
                    >
                      <i className='bi bi-pencil-square'></i>
                    </button>{' '}
                    |{' '}
                    <button
                      className='border-0 bg-transparent'
                      onClick={(e) => handleDelete(e, student)}
                    >
                      <i className='bi bi-trash-fill'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentTable;
