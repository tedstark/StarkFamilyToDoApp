let mongoose = require('mongoose');

//Task Schema
let taskSchema = mongoose.Schema({
    creator:{
        type:String,
        required:false
    },
    assignedTo:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    tasktitle:{
        type:String,
        required:true
    },
    taskbody:{
        type:String,
        required:false
    },
    complete:{
        type:Boolean,
        required:false
    }
},
{timestamps: {
  createdAt:'Created',
  updatedAt:'Updated'
}
});
let Task = module.exports = mongoose.model('Task', taskSchema);
