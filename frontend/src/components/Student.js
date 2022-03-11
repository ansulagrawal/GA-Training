import React, { useState } from 'react';
import StudentTable from './StudentTable';
import TableSearch from './TableSearch';

const data = [
   {
      id: 1,
      first_name: 'Ansul',
      last_name: 'Agrawal',
      email: 'ansulagrawal9@gmail.com',
      phone: 8866776740,
      address: 'Navsari',
      dob: '1999-08-01',
   },
   {
      id: 2,
      first_name: 'abc',
      last_name: 'xyz',
      email: 'abcxyz1@gmail.com',
      phone: 9999999999,
      address: 'ABXYZ',
      dob: '2020-01-11',
   },
   {
      id: 3,
      first_name: 'bcd',
      last_name: 'wxy',
      email: 'bcdwxy1@gmail.com',
      phone: 9999999998,
      address: 'BCWX',
      dob: '2020-01-10',
   },
   {
      id: 4,
      first_name: 'cde',
      last_name: 'vwx',
      email: 'cdevwx1@gmail.com',
      phone: 9999993991,
      address: 'CDVW',
      dob: '2020-01-09',
   },
   {
      id: 5,
      first_name: 'def',
      last_name: 'uvw',
      email: 'defuvw1@gmail.com',
      phone: 9791992994,
      address: 'DEUW',
      dob: '2020-01-08',
   },
];

const colNames = [
   'id',
   'first_name',
   'last_name',
   'email',
   'phone',
   'address',
   'dob',
];

const Student = () => {
   const [details, setDetails] = useState(data);
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
         <TableSearch data={data} updateList={setDetails} />
         <StudentTable list={details} colNames={colNames} />
      </div>
   );
};

export default Student;
