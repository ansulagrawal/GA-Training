const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const log = require('../logGenerator');
// Route 1: Read all students
router.get('/', (req, res) => {
  log.info('read all api is called');
  try {
    log.info('try function is called');
    Student.findAll().then((student) => {
      if (student) {
        log.info('Users is found');
        res.json({
          status: true,
          data: student,
        });
      } else {
        log.warn('No users are found in the database');
        res.json({
          status: false,
          errors: 'No users are found in the database',
        });
      }
    });
  } catch (errors) {
    log.warn('catch function is called');
    log.error({ errors });
    res.status(400).json({
      status: false,
      errors: 'Internal Server Error',
    });
  }
});

// Route 2: Read one student
router.get('/:id', (req, res) => {
  log.info('read one api is called');
  try {
    log.info('try function is called');
    Student.findOne({ where: { id: req.params.id } }).then((student) => {
      if (student) {
        log.info('User is found with same id');
        res.json({
          status: true,
          data: student,
        });
      } else {
        log.warn('User is not found with same id');
        res.status(404).json({
          status: false,
          errors: 'User is not found with same id',
        });
      }
    });
  } catch (errors) {
    log.warn('catch function is called');
    log.error(errors);
    res.status(500).json({
      status: false,
      errors: 'Internal Server Error',
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
    log.info('create one api is called');
    log.info(req.body);
    log.info('Validation method called');
    const errors = validationResult(req);
    log.info('Validation is done');
    if (!errors.isEmpty()) {
      log.warn('Validation errors are found');
      log.error(errors);
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    try {
      let body = req.body;
      // Function to check if email or First Name already exists:
      function handleCheck(data) {
        if (data.length === 0) {
          log.info('Email or Mobile Number does not exist');
          Student.create(body).then(
            log.info('User created successfully'),
            res.json({
              status: true,
              msg: 'User created successfully',
            })
          );
        } else {
          log.warn('Email or Mobile Number already exists');
          res.status(400).json({
            status: false,
            errors: 'Mobile Number or Email id already exists!',
          });
        }
      }
      //
      Student.findAll({
        where: {
          [Op.or]: [{ mobile: body.mobile }, { email: body.email }],
        },
      }).then((data) => {
        handleCheck(data);
      });
    } catch (errors) {
      log.warn('catch function is called');
      log.error(errors);
      res.status(400).json({
        status: false,
        errors: 'Internal Server Error',
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
    log.info('update one api is called');
    log.info('Validation method called');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log.warn('Validation errors are found');
      log.error({ errors: errors.array() });
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    try {
      let body = req.body;
      Student.findAll({
        where: {
          [Op.and]: [
            { email: body.email },
            { mobile: body.mobile },
            { [Op.not]: { id: req.params.id } },
          ],
        },
      }).then((data) => {
        if (data.length > 0) {
          log.warn('Email or Mobile Number already exists');
          return res.status(400).json({
            status: false,
            errors: 'User with same Email address already exists',
          });
        } else {
          log.info('User with same email not found');
          Student.update(body, { where: { id: req.params.id } });
          log.info('User updated successfully');
          res.json({ status: true, msg: 'Student updated successfully' });
        }
      });
    } catch (errors) {
      log.warn('catch function is called');
      log.error(errors);
      res.status(400).json({
        status: false,
        errors: 'Internal Server Error',
      });
    }
  }
);

// Route 5: Delete one student
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    log.warn('delete one api is called'),
      Student.destroy({ where: { id: id } }).then(
        res.json({ status: true, msg: 'Student deleted successfully' }),
        log.info('User deleted successfully')
      );
  } catch (errors) {
    log.warn('catch function is called');
    log.error(errors);
    res.status(400).json({
      status: false,
      errors: 'Internal Server Error',
    });
  }
});

module.exports = router;
