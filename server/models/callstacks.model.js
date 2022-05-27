const mongoose = require('mongoose');
const taskSchema = require('./subDocSchemas/_tasks.schema');

const callstacksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'The Callstack name field must not be empty' ],
        minlength: [ 3, 'The Callstack name must be at least 3 characters' ]
    },
    priority: {
        type: Number,
        required: [ true, 'The priority field must not be empty' ],
        min: [ 1, 'Priority must be at least 1' ],
        max: [ 5, 'Priority must be at most 5' ]
    },
    difficulty: {
        type: Number,
        required: [ true, 'The difficulty field must not be empty' ],
        min: [ 1, 'Difficulty must be at least 1' ],
        max: [ 5, 'Difficulty must be at most 5' ]
    },
    due: {
        type: Date,
        required: [ true, 'The due-date must not be empty'],
        min: [ Date.now(), 'The due date must be in the future' ]
    },
    tasks: {
        type: [ taskSchema ],
        default: []
    }
}, { timestamps: true });

const Callstack = mongoose.model('Callstack', callstacksSchema);
module.exports = Callstack;