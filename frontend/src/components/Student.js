import React, { Component, useState } from 'react';
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
// export class Student extends Component {
//    render() {
//       return (
//          <div>
//             Student
//             <TableSearch />
//             <StudentTable list={data} />
//          </div>
//       );
//    }
// }

// Functional based component

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
