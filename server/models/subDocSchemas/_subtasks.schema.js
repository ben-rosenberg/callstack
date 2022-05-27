const mongoose = require('mongoose');

const subTasksSchema = mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'The subtask name field must not be empty' ]
    }
}, { timestamps: true });

module.exports = subTasksSchema;