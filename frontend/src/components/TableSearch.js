import React from 'react';
import { filterStudent } from '../helperFunction';

const TableSearch = ({ data, updateList }) => {
   const onChange = (e) => {
      const searchString = e.target.value;
      let result = filterStudent(data, searchString);
      updateList(result);
   };

   return (
      <div
         className='Search'
         style={{
            marginBottom: '50px',
            display: 'flex',
            justifyContent: 'flex-end',
         }}
      >
         Search:
         <input
            type='text'
            style={{ marginLeft: '10px', marginRight: '10vh' }}
            onChange={onChange}
         ></input>
      </div>
   );
};

export default TableSearch;
