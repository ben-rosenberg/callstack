const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json(), express.urlencoded({ extended: true }), cors());

require('./config/mongoose.config');
require('./routes/callstacks.routes')(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));