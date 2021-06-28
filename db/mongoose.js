
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true 
        });
        console.log(`Mongo DB Connected`);
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;
