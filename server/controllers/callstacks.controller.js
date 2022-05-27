const Callstack = require('../models/callstacks.model');

/**
 * NOTE: Need to order callstacks by due-date
 */
module.exports = {
    getAll: (req, res) => {
        Callstack.find({}, null, { sort: 'due' })
            .then(allUsersCallstacks => res.json(allUsersCallstacks))
            .catch(err => console.log(err));
    },

    getOneById: (req, res) => {
        Callstack.findOne({ _id: req.params.callstackId })
            .then(dbCallstack => res.json(dbCallstack))
            .catch(err => console.log(err));
    },

    createNew: (req, res) => {
        Callstack.create(req.body)
            .then(newCallstack => res.json(newCallstack))
            .catch(err => res.status(400).json(err))
    },
    
    update: (req, res) => {
        Callstack.findOneAndUpdate({ _id: req.params.callstackId }, req.body, {
            new: true,
            runValidators: true
        })
            .then(updatedCallstack => res.json(updatedCallstack))
            .catch(err => { res.status(400).json(err) });
    },
    
    delete: (req, res) => {
        Callstack.findOneAndDelete({ _id: req.params.callstackId })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    },

    createTask: (req, res) => {
        Callstack.findOneAndUpdate(
            { _id: req.params.callstackId },
            { $push: { tasks: [req.body] } },
            { new: true }
        )
            .then(updatedCallstack => res.json(updatedCallstack))
            .catch(err => res.json(err));
    },

    updateTask: (req, res) => {
        Callstack.findOneAndUpdate(
            { _id: req.params.callstackId, "tasks._id": req.params.taskId },
            { $set: { tasks: req.body } },
            { new: true, runValidators: true }
        )
            .then(updatedCallstack => res.json(updatedCallstack))
            .catch(err => res.status(400).json(err));
    },

    updateTaskIsCompleted: (req, res) => {
        Callstack.findOneAndUpdate(
            { _id: req.params.callstackId, "tasks._id": req.params.taskId },
            { $set: { "tasks.$.isCompleted": req.body.isCompleted } },
            { new: true }
        )
            .then(updatedCallstack => res.json(updatedCallstack))
            .catch(err => res.json(err));
    }
}