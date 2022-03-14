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
