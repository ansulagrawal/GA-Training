const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Routes:
app.use('/api/v1/student', require('./routes/student'));

app.listen(PORT, () => {
   console.log('Server started on port', PORT);
});
