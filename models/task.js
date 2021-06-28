
const mongoose=require("mongoose");
 
const taskSchema= new mongoose.Schema({
title: {
    type: String,
    required: true
  },
  Start_Date: {
    type: Date,
    default:null
  },
  End_Date: {
    type: Date,
    default:null 
  },
  Priority: {
    type: String
  },
  Status:{
    type: Number, // 0- Open, 1- Complete,
    default:0
  },

  Project:[{ 
       type: Schema.Types.ObjectId, 
        ref: 'Project' }],
  owner: [{ 
      type: Schema.Types.ObjectId,
      ref: 'User' }]
});

const Task= mongoose.model("Task",taskSchema);
module.exports=Task;