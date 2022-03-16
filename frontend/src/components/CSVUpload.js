import React from 'react';

const CSVUpload = ({ handleFileUpload }) => {
  return (
    <div className='mt-5 mb-2'>
      <label htmlFor='formFileSm' className='form-label'>
        Upload your csv data:
      </label>
      <input
        className='form-control form-control-sm'
        id='formFileSm'
        accept='.csv,.xlsx,.xls'
        onChange={handleFileUpload}
        type='file'
      ></input>
    </div>
  );
};

export default CSVUpload;
