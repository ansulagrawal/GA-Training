const express = require('express');
const router = express.Router();
const db = require('../db');
const { body, validationResult } = require('express-validator');

// Route 1: Read all students
router.get('/', (req, res) => {
   db.query('SELECT * FROM student', (err, rows) => {
      if (err) {
         console.log(err);
      }
      res.json(rows);
   });
});

// Route 2: Read one student
router.get('/:id', (req, res) => {
   const id = req.params.id || req.query.id;

   db.query(`SELECT * FROM student where id = ?`, [id], (err, rows) => {
      if (err) {
         console.log(err);
      }
      res.json(rows);
   });
});

// Route 3: Create one student
router.post(
   '/',
   [
      // validation
      body('f_name')
         .isLength({ min: 3 })
         .withMessage('must be at least 3 characters')
         .isAlpha()
         .withMessage('First name must be alphabetic'),
      body('l_name')
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
   (req, res) => {
      try {
         const { f_name, l_name, email, mobile, dob, address } = req.body;
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
            });
         }
         const sqlQuerry =
            ' INSERT INTO student(first_name, last_name, mobile, email, dob, address) VALUES(?, ?, ?, ?, ?, ?) ';
         db.query(
            sqlQuerry,
            [f_name, l_name, mobile, email, dob, address],
            (err) => {
               let error = '';
               if (err) {
                  for (var k in err) {
                     if (k == 'sqlMessage') error = err[k];
                  }
                  res.status(500).send({
                     error: 'Insert failed!',
                     sqlErrorMessage: error,
                  });
               } else {
                  res.json('Value inserted');
               }
            }
         );
      } catch (error) {
         console.log(error);
      }
   }
);

// Route 4: Update one student
router.put(
   '/:id',
   [
      // validation
      body('f_name')
         .isLength({ min: 3 })
         .withMessage('must be at least 3 characters')
         .isAlpha()
         .withMessage('First name must be alphabetic'),
      body('l_name')
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
   (req, res) => {
      const { id, f_name, l_name, email, mobile, dob, address } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
         });
      }
      let sql =
         'UPDATE student set first_name = ?, last_name = ?, mobile = ?, email = ?, dob = ?, address=? where id = ?';
      db.query(
         sql,
         [f_name, l_name, mobile, email, dob, address, id],
         (err) => {
            if (err) {
               console.log(err);
               res.status(500).send({
                  error: 'Update failed!',
               });
            } else {
               res.json('Value updated successfully');
            }
         }
      );
   }
);

// Route 5: Delete one student
router.delete('/:id', (req, res) => {
   const id = req.params.id;
   db.query('DELETE FROM student WHERE id = ?', [id], (err) => {
      if (err) {
         console.log(err);
      } else {
         res.json('Value deleted successfully');
      }
   });
});

module.exports = router;
