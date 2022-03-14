import React, { useEffect } from 'react';
import { filterStudent } from '../helperFunction';

const TableSearch = ({ data, updateList }) => {
  const onChange = (e) => {
    const searchString = e.target.value;
    let result = filterStudent(data, searchString);
    updateList(result);
  };
  useEffect(() => {
    updateList(data);
  }, [data]);

  return (
    <div className='ms-5 px-1'>
      <div className='Search mb-3 d-flex justify-content-end'>
        Search:
        <input type='text' className='mx-2 ' onChange={onChange}></input>
      </div>
    </div>
  );
};

export default TableSearch;
