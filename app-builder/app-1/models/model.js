const mongoose = require('mongoose');

const TaskSchema =  new mongoose.Schema({
    name : String,
    task : String
});

const Task = mongoose.model('hui', TaskSchema);

module.exports = Task;