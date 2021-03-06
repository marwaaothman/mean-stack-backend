const mongoose = require('mongoose');

const teamSchema= new mongoose.Schema({
    name : {type:String,
          required: true
        },
    manager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
},
    {
        timestamps:true
    }
);
const Team= mongoose.model("Team",teamSchema);
module.exports=Team;