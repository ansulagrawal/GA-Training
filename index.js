const express = require('express');
// const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Routes:
app.use('/api/v1/student', require('./routes/student'));

app.listen(PORT, () => {
   console.log('Server started on port', PORT);
});
