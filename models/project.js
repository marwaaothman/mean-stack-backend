const mongoose= require('mongoose');

const projectSchema = new mongoose.Schema({
    title:{  type: String },
    budget:{  type: Number },
    Start_Date:{  type: Date},
    End_Date:{  type: Date },
    description:{  type: String },

    manager: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }], 
    assignee: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }]
   /* tasks: [{
        type: mongoose.Types.ObjectId,
        ref: 'task'
    }], */
}
     
);
const Project= mongoose.model("Project", projectSchema);
module.exports= Project ;