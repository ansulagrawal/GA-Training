import React from "react";
import { downloadCSV, objectToCSV } from "../helperFunction";

const CSVCreator = ({ data }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary mb-3 me-3"
        onClick={(e) => {
          e.preventDefault();
          const csvData = objectToCSV(data);
          downloadCSV(csvData);
        }}>
        Download Data
      </button>
    </>
  );
};

export default CSVCreator;
