import React, { Component } from 'react';

export class TableSearch extends Component {
   filterStudent = (students, searchString) => {
      return students.filter((obj) => {
         for (let detail in obj) {
            if (
               String(obj[detail].toString().toLowerCase()).includes(
                  searchString.toLowerCase()
               )
            )
               return true;
         }
      });
   };
   onChange = (e) => {
      const searchString = e.target.value;
      let result = this.filterStudent(this.props.data, searchString);
      this.props.updateData(result);
   };
   render() {
      return (
         <>
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
                  onChange={this.onChange}
               ></input>
            </div>
         </>
      );
   }
}

// Functional component

// const TableSearch = ({ data, updateList }) => {
//    const filterStudent = (students, searchString) => {
//       return students.filter((obj) => {
//          for (let detail in obj) {
//             if (
//                String(obj[detail].toString().toLowerCase()).includes(
//                   searchString.toLowerCase()
//                )
//             )
//                return true;
//          }
//       });
//    };
//    const onChange = (e) => {
//       const searchString = e.target.value;
//       let result = filterStudent(data, searchString);
//       updateList(result);
//    };
//    return (
//       <div
//          className='Search'
//          style={{
//             marginBottom: '50px',
//             display: 'flex',
//             justifyContent: 'flex-end',
//          }}
//       >
//          Search:
//          <input
//             type='text'
//             style={{ marginLeft: '10px', marginRight: '10vh' }}
//             onChange={onChange}
//          ></input>
//       </div>
//    );
// };

export default TableSearch;
