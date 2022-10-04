import React from "react";

const AddStudent = ({ updateModalType }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => {
          updateModalType("add");
        }}>
        Add Student
      </button>
    </>
  );
};

export default AddStudent;
