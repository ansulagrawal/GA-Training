const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const { body, validationResult } = require('express-validator');

// Route 1: Read all students
router.get('/', (req, res) => {
   try {
      Student.findAll().then((student) => {
         res.json({
            status: true,
            data: student,
         });
      });
   } catch (errors) {
      res.status(500).json({
         status: false,
         errors,
      });
   }
});

// Route 2: Read one student
router.get('/:id', (req, res) => {
   try {
      Student.findOne({ where: { id: req.params.id } }).then((student) => {
         res.json({
            status: true,
            data: student,
         });
      });
   } catch (errors) {
      res.status(500).json({
         status: false,
         errors,
      });
   }
});

// Route 3: Create one student
router.post(
   '/',
   [
      // validation
      body('first_name')
         .isLength({ min: 3 })
         .withMessage('must be at least 3 characters')
         .isAlpha()
         .withMessage('First name must be alphabetic'),
      body('last_name')
         .optional()
         .isLength({ min: 2 })
         .withMessage('must be at least 2 characters')
         .isAlpha()
         .withMessage('Last name must be alphabetic'),
      body('email')
         .isEmail()
         .withMessage('must be a valid email address')
         .custom((value) => {
            let val = value.slice(-4);
            if (val != '.com') {
               throw new Error('Email must be a valid .com email address');
            }
            return true;
         }),
      body('dob')
         .optional()
         .isDate()
         .withMessage('must be a valid date in format YYYY-MM-DD')
         .isBefore()
         .withMessage('date must be before today'),
      body('address')
         .optional()
         .isLength({ max: 50 })
         .withMessage('must be less than 50 characters'),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ status: false, errors: errors.array() });
      }

      try {
         let body = req.body;
         let user = await Student.findOne({ where: { email: body.email } });
         if (user !== null) {
            return res.status(400).json({
               status: false,
               errors: 'user with same email already exists',
            });
         }
         Student.create(body).then((student) => ({
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            mobile: student.mobile,
            dob: student.dob,
            address: student.address,
         }));
      } catch (error) {
         console.log(error);
         res.status(400).json({
            status: false,
            errors: error,
         });
      }
      res.json({ status: true, msg: 'Student created successfully' });
   }
);

// Route 4: Update one student
router.put(
   '/:id',
   [
      // validation
      body('first_name')
         .isLength({ min: 3 })
         .withMessage('must be at least 3 characters')
         .isAlpha()
         .withMessage('First name must be alphabetic'),
      body('last_name')
         .optional()
         .isLength({ min: 2 })
         .withMessage('must be at least 2 characters')
         .isAlpha()
         .withMessage('Last name must be alphabetic'),
      body('email')
         .isEmail()
         .withMessage('must be a valid email address')
         .custom((value) => {
            let val = value.slice(-4);
            if (val != '.com') {
               throw new Error('Email must be a valid .com email address');
            }
            return true;
         }),
      body('dob')
         .optional()
         .isDate()
         .withMessage('must be a valid date in format YYYY-MM-DD')
         .isBefore()
         .withMessage('date must be before today'),
      body('address')
         .optional()
         .isLength({ max: 50 })
         .withMessage('must be less than 50 characters'),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ status: false, errors: errors.array() });
      }
      try {
         let body = req.body;
         let user = await Student.findAll({ where: { email: body.email } });
         if (user.length > 1) {
            return res.status(400).json({
               status: false,
               errors: 'user with same email already exists',
            });
         }

         Student.update(body, { where: { id: req.params.id } }).then(
            (student) => ({
               first_name: student.first_name,
               last_name: student.last_name,
               email: student.email,
               mobile: student.mobile,
               dob: student.dob,
               address: student.address,
            })
         );
      } catch (error) {
         console.log(errors);
      }
      res.send('Student updated successfully');
   }
);

// Route 5: Delete one student
router.delete('/:id', (req, res) => {
   const id = req.params.id;
   try {
      Student.destroy({ where: { id: id } }).then(
         res.json({ status: true, msg: 'Student deleted successfully' })
      );
   } catch (error) {
      console.log(error);
      res.status(400).json({
         status: false,
         errors: error,
      });
   }
});

module.exports = router;
