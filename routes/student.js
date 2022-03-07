const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const csv = require('csv-parser');
const csvWriter = require('../db');
let results = [];

// Route 1: Read all students
router.get('/', (req, res) => {
   try {
      results = [];
      fs.createReadStream('./data/Student.csv')
         .pipe(csv())
         .on('data', (row) => results.push(row))
         .on('end', () => res.send(results));
   } catch (err) {
      console.error(err);
      res.send(err);
   }
});

// Route 2: Read one student
router.get('/:id', (req, res) => {
   try {
      results = [];
      fs.createReadStream('./data/Student.csv')
         .pipe(csv())
         .on('data', (row) => results.push(row))
         .on('end', () => {
            for (let i = 0; i < results.length; i++) {
               if (results[i].id == req.params.id) {
                  res.send(results[i]);
                  return;
               }
            }
            results = [];
            res.status(400).send('Student not found');
         });
   } catch (err) {
      console.error(err);
      res.send(err);
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
         return res.status(400).send({ status: false, errors: errors.array() });
      }
      try {
         let body = req.body;
         results = [];
         await fs
            .createReadStream('./data/Student.csv')
            .pipe(csv())
            .on('data', (row) => results.push(row))
            .on('end', () => {
               for (let i = 0; i < results.length; i++) {
                  if (
                     results[i].email == body.email ||
                     results[i].mobile == body.mobile
                  ) {
                     res.status(400).send({
                        status: false,
                        message:
                           'User already exists with this  email or mobile',
                     });
                     return;
                  }
               }
               results = [
                  {
                     id: results.length + 1,
                     first_name: body.first_name,
                     last_name: body.last_name,
                     email: body.email,
                     mobile: body.mobile,
                     dob: body.dob,
                     address: body.address,
                  },
               ];

               csvWriter.writeRecords(results).then(() => {
                  res.send({
                     status: true,
                     msg: 'User creation was successful',
                  });
               });
            });
      } catch (err) {
         console.log(err);
         res.send(err);
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
         results = [];
         let body = req.body;
         await fs
            .createReadStream('./data/Student.csv')
            .pipe(csv())
            .on('data', (row) => {
               const user = {
                  id: req.params.id,
                  first_name: body.first_name,
                  last_name: body.last_name,
                  email: body.email,
                  mobile: body.mobile,
                  dob: body.dob,
                  address: body.address,
               };
               results.push(user);
            })
            .on('end', () => {
               res.send(results);
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
