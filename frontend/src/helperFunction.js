export const filterStudent = (students, searchString) => {
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

export const validateLength = (inputString, min, max) => {
  if (inputString.length >= min && inputString.length <= max) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  if (re.test(String(email).toLowerCase())) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  const re =
    /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?![^<>]*[<>])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
  if (re.test(String(password))) {
    return true;
  } else {
    return false;
  }
};

// export const objectToCSV = (data) => {
//   const csvRows = [];
//   const header = Object.keys(data[0]);
//   csvRows.push(header.join(','));

//   for (const row of data) {
//     const values = header.map((header) => {
//       const escaped = ('' + row[header]).replace(/"/g, '\\g"');
//       return `"${escaped}"`;
//     });
//     csvRows.push(values.join(','));
//   }
//   return csvRows.join('\n');
// };

// export const downloadCSV = (data) => {
//   const blob = new Blob([data], { type: 'text/csv' });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.setAttribute('hidden', '');
//   a.setAttribute('href', url);
//   a.setAttribute('download', 'download.csv');
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// };
