import React, { useEffect, useState } from "react";
import StudentTable from "./StudentTable";
import TableSearch from "./TableSearch";
import AddStudent from "./AddStudent";
import { useNavigate } from "react-router-dom";
import CSVCreator from "./CSVCreator";
import * as XLSX from "xlsx";
import CSVUpload from "./CSVUpload";
const axios = require("axios").default;

const colNames = ["id", "first_name", "last_name", "email", "mobile", "address", "dob"];

const Student = ({ userDetails, isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    isLogin !== true && navigate("/login");
  }, [isLogin]);

  const initialStudent = [];
  const [students, setStudents] = useState(initialStudent);

  const host = process.env.REACT_APP_HOST;
  const getAllUser = () => {
    console.log("Get all user called");
    axios.get(`${host}/student`).then((res) => {
      setStudents(res.data.data);
      console.log(res);
    });
  };
  
  useEffect(() => {
    getAllUser();
  }, []);

  const [modalType, setModalType] = useState("");
  const [serchStudents, setSerchStudents] = useState(students);
  const [addFormData, setAddFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
  });

  const handleEdit = (e, student) => {
    e.preventDefault();
    setModalType("edit");
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
      mobile: editFormData.mobile,
      address: editFormData.address,
      dob: editFormData.dob,
    };

    const newStudents = [...students];

    const index = students.findIndex((student) => student.id === editFormData.id);

    newStudents[index] = editedStudent;

    setStudents(newStudents);
  };

  const handleDelete = (e, stud) => {
    e.preventDefault();
    // const newStudents = [...students];
    // console.log('id', stud.id);
    axios.delete(`${host}/student/${stud.id}`).then((res) => {
      console.log(res);
    });
    getAllUser();
    // const index = students.findIndex((student) => student.id === stud.id);
    // console.log(index);
    // newStudents.splice(index, 1);
    // setStudents(newStudents);
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
      first_name: addFormData.first_name,
      last_name: addFormData.last_name,
      email: addFormData.email,
      mobile: addFormData.mobile,
      dob: addFormData.dob,
      address: addFormData.address,
    };
    console.log(newStudent);
    try {
      axios
        .post(`${host}/student`, {
          first_name: addFormData.first_name,
          last_name: addFormData.last_name,
          email: addFormData.email,
          mobile: addFormData.mobile,
          dob: addFormData.dob,
          address: addFormData.address,
        })
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          getAllUser();
        });
    } catch (error) {
      console.log(error);
    }
    getAllUser();
  };

  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]"(?:(?:[^"]"){2})[^"]$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]"(?:(?:[^"]"){2})[^"]$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    const newStudent = [...students, ...list];
    setStudents(newStudent);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      {/* {getUser()} */}
      <div className="container">
        <CSVUpload handleFileUpload={handleFileUpload} />
      </div>
      <div
        style={{
          display: "flex",
          margin: "10vh auto",
          flexDirection: "column",
          justifyContent: "center",
          width: "95%",
        }}>
        <div className="d-flex justify-content-end">
          <CSVCreator data={students} />
          <AddStudent modalType={modalType} updateModalType={setModalType} handleAddFormChange={handleAddFormChange} />
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
    </>
  );
};

export default Student;
