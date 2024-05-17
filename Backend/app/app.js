const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
