const mongoose = require('mongoose');
/* const subTasksSchema = require('./_subtasks.schema'); */

/**
 * NOTE: Need to make validation that ensures the due-date is at or before the
 * due-date of the Callstack to which this task belongs. 
 */
const tasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'The Callstack name field must not be empty' ],
        minlength: [ 3, 'The Callstack name must be at least 3 characters' ]
    },
    due: {
        type: Date,
        required: [ true, 'The due-date must not be empty'],
        min: [ Date.now(), 'The due date must be in the future' ]
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    /* subtasks: [ subTasksSchema ], */
    //dependentTasks: [ tasksSchema ]
}, { timestamps: true });

tasksSchema.dependentTasks = [ tasksSchema ];

module.exports = tasksSchema;