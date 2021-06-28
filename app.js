const express = require('express');
const connectDB =require('./db/mongoose.js');
const dotenv = require('dotenv');
const userControl = require('./controllers/usercontroller');
const projectControl = require('./controllers/projetcontroller');
const app = express();


dotenv.config();

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));




connectDB();

 app.listen(process.env.PORT || PORT, function (err) {

    if(err) {
        console.log(err);
    } else {
           console.log("app server listening at %s",process.env.PORT);
    }
})
app.use('/users',userControl);
app.use('/projects',projectControl);
