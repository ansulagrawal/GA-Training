const express = require('express');
const app = express();
const cors = require('cors');
const log = require('./logGenerator');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Sequelize models
const db = require('./models');

// Routes:
app.use('/api/v1/student', require('./routes/student'));
app.use('/api/v1/functionCall', require('./routes/functionCall'));

db.sequelize.sync().then((req) => {
   app.listen(PORT, () => {
      console.log('Server started on port', PORT);
      log.info('Server is running on port', PORT);
   });
});
