const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
   path: './data/Student.csv',
   header: [
      'id',
      'first_name',
      'last_name',
      'email',
      'mobile',
      'dob',
      'address',
   ].map((item) => ({ id: item, title: item })),
});

module.exports = csvWriter;
