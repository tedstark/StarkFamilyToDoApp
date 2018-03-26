let mongoose = require('mongoose');

//Task Schema
let taskSchema = mongoose.Schema({
    creator:{
        type:String,
        required:false
    },
    assignedto:{
        type:String,
        required:true
    },
    duedate:{
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
  createdAt:'created',
  updatedAt:'updated'
}
});
let Task = module.exports = mongoose.model('Task', taskSchema);
