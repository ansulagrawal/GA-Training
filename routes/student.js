const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

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

         // Function to check if email or First Name already exists:
         function handleCheck(req, res, data) {
            if (data.length === 0) {
               console.log('Put data', data, body);
               Student.create(body).then(
                  res.json({
                     status: true,
                     msg: 'Student created successfully',
                  })
               );
            } else {
               res.status(400).json({
                  status: false,
                  error: 'Student name or email already exists!',
               });
            }
         }
         //
         Student.findAll({
            where: {
               [Op.or]: [
                  { email: body.email },
                  { first_name: body.first_name },
               ],
            },
         }).then((data) => {
            handleCheck(req, res, data);
         });
      } catch (error) {
         console.log(error);
         res.status(400).json({
            status: false,
            errors: error,
         });
      }
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
         Student.findAll({
            where: {
               [Op.and]: [
                  { id: req.params.id },
                  { [Op.not]: [{ email: body.email }] },
               ],
            },
         }).then((data) => {
            if (data.length > 0) {
               return res.status(400).json({
                  status: false,
                  errors: 'user with same email already exists',
               });
            } else {
               Student.update(body, { where: { id: req.params.id } });
               res.json({ status: true, msg: 'Student updated successfully' });
            }
         });
      } catch (error) {
         console.log(errors);
      }
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
