const express = require('express');
const router = express.Router();
const { Student } = require('../models');

router.post('/filterStudents', (req, res) => {
   const body = req.body;
   const filterStudents = (variable, value) => {
      if (!variable) {
         Student.findAll().then((student) => {
            if (student) {
               const dataFilter = student.filter((s) => {
                  let { first_name, last_name, email, address, mobile, dob } =
                     s;
                  return first_name.includes(body.searchString)
                     ? first_name
                     : '' || last_name.includes(body.searchString)
                     ? last_name
                     : '' || address.includes(body.searchString)
                     ? address
                     : '' || email.includes(body.searchString)
                     ? email
                     : '' ||
                       (mobile + '').includes(body.searchString) ||
                       dob.includes(body.searchString)
                     ? dob
                     : '';
               });
               res.json({ result: dataFilter });
            }
         });
      } else {
         let result = variable.filter((s) => {
            return (s + '').includes(value);
         });
         res.json({ result });
      }
   };
   filterStudents(body.students, body.searchString);
});

router.post('/validateLength', (req, res) => {
   const { inputString, min, max } = req.body;
   const validateLength = (inputString, min, max) => {
      if (inputString.length >= min && inputString.length <= max) {
         res.json({ result: true });
      } else {
         res.json({ result: false });
      }
   };
   validateLength(inputString, min, max);
});

router.post('/validateEmail', (req, res) => {
   const { email } = req.body;
   const validateEmail = (email) => {
      const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      if (re.test(String(email).toLowerCase())) {
         res.json({ result: true });
      } else {
         res.json({ result: false });
      }
   };
   validateEmail(email);
});

router.post('/validatePassword', (req, res) => {
   const { password } = req.body;
   const validatePassword = (password) => {
      const re =
         /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?![^<>]*[<>])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/;
      if (re.test(String(password))) {
         res.json({ result: true });
      } else {
         res.json({ result: false });
      }
   };
   validatePassword(password);
});

module.exports = router;
