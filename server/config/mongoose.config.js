const mongoose = require('mongoose');
const DB = 'callstack_db';

mongoose.connect(`mongodb://localhost/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Successfully connected to database: ${DB}`))
    .catch((err) => {
        console.log(`Error connecting to database: ${DB}`);
        console.log('Error:');
        console.log(err);
    });
