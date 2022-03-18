import React from 'react';

const Modal = ({
  colNames,
  editDetails,
  editOnChange,
  editFormSumbit,
  modalType,
  addDetails,
  addOnChange,
  addFormSumbit,
}) => {
  return (
    <>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>
                {modalType === 'edit' ? 'Edit Details' : 'Add Student'}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {colNames.map((colName, index) => (
                <div className='mb-3 row' key={index}>
                  <label
                    htmlFor={`static${colName}`}
                    className='col-sm-2 col-form-label'
                  >
                    {colName === 'id'
                      ? modalType === 'edit'
                        ? 'ID'
                        : ''
                      : colName}
                  </label>
                  <div className='col-sm-10'>
                    {colName !== 'id' ? (
                      <input
                        name={colName}
                        type={`${
                          colName === 'dob'
                            ? 'date'
                            : colName === 'email'
                            ? 'email'
                            : colName === 'mobile'
                            ? 'number'
                            : 'text'
                        }`}
                        className='form-control'
                        id={`static${colName}`}
                        value={
                          modalType === 'edit'
                            ? editDetails[colName]
                            : addDetails[colName]
                        }
                        onChange={(e) => {
                          modalType === 'edit'
                            ? editOnChange(e)
                            : addOnChange(e);
                        }}
                      />
                    ) : modalType === 'edit' ? (
                      editDetails[colName]
                    ) : (
                      addDetails[colName]
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={modalType === 'edit' ? editFormSumbit : addFormSumbit}
              >
                {modalType === 'edit' ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
