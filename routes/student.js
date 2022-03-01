const express = require('express');
const router = express.Router();

const db = require('../db');

// Route 1: Read all students
router.get('/', (req, res, next) => {
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
router.post('/', (req, res) => {
   const f_name = req.body.f_name;
   const l_name = req.body.l_name;
   const email = req.body.email;
   const mobile = req.body.mobile;
   const dob = req.body.dob;
   const address = req.body.address;
   const sqlQuerry =
      ' INSERT INTO student(first_name, last_name, mobile, email, dob, address) VALUES(?, ?, ?, ?, ?, ?) ';
   try {
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
});

// Route 4: Update one student
router.put('/:id', (req, res) => {
   const id = req.params.id;
   const f_name = req.body.f_name;
   const l_name = req.body.l_name;
   const email = req.body.email;
   const mobile = req.body.mobile;
   const dob = req.body.dob;
   const address = req.body.address;
   let sql =
      'UPDATE student set first_name = ?, last_name = ?, mobile = ?, email = ?, dob = ?, address=? where id = ?';
   db.query(
      sql,
      [f_name, l_name, mobile, email, dob, address, id],
      (err, result) => {
         if (err) {
            console.log(err);
         } else {
            res.json({
               status: 'Value updated successfully',
               id: id,
               first_name: f_name,
               last_name: l_name,
               mobile: mobile,
               email: email,
               dob: dob,
               address: address,
            });
         }
      }
   );
});

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
