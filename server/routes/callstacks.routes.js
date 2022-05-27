const CallstackController = require('../controllers/callstacks.controller');

/**
 * 
 * @param {Express} app 
 */
module.exports = (app) => {
    app.get('/api/callstacks', CallstackController.getAll);
    app.get('/api/callstacks/:callstackId', CallstackController.getOneById);
    app.post('/api/callstacks', CallstackController.createNew);
    app.put('/api/callstacks', CallstackController.update);

    /* TASKS */

    app.put('/api/callstacks/:callstackId/tasks', CallstackController.createTask);
    app.put('/api/callstacks/:callstackId/tasks/:taskId/update', CallstackController.updateTask);
    app.put('/api/callstacks/:callstackId/tasks/:taskId/complete', CallstackController.updateTaskIsCompleted);
}