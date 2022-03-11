import React from 'react';

const StudentTable = ({ list, colNames, width = '90%', height = 'auto' }) => {
   return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
         {list.length > 0 && (
            <table
               cellSpacing='0'
               style={{
                  width: width,
                  height: height,
                  padding: '5px 0px',
                  border: '1px solid #ddd',
                  textAlign: 'center',
                  borderCollapse: 'collapse',
               }}
            >
               <thead
                  style={{
                     backgroundColor: '#56ebb2',
                     borderBottom: '1px solid gray',
                  }}
               >
                  <tr>
                     {colNames.map((colName, index) => (
                        <th key={index}>{colName.toUpperCase()}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {Object.values(list).map((student, index) => (
                     <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                        {Object.values(student).map((val, index2) => (
                           <td key={index2}>{val}</td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>
   );
};

export default StudentTable;
