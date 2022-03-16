const express = require('express');
const router = express.Router();

// Route 1: Read all students
router.get('/', (req, res, next) => {
   res.json({
      message: 'HELLO READ ALL',
   });
});

// Route 2: Read one student
router.get('/:id', (req, res, next) => {
   res.json({
      message: 'HELLO READ ONE',
   });
});

// Route 3: Create one student
router.post('/', (req, res, next) => {
   res.json({
      message: 'HELLO CREATE ONE',
   });
});

// Route 4: Update one student
router.put('/:id', (req, res, next) => {
   res.json({
      message: 'HELLO UPDATE ONE',
   });
});

// Route 5: Delete one student
router.delete('/:id', (req, res, next) => {
   res.json({
      message: 'HELLO DELETE ONE',
   });
});

module.exports = router;
