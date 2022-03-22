const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerdb', { useNewUrlParser:true, useunifiedTopology:true })
.then(()=> console.log("DB Connected Successful"))
.catch((error)=> {
    console.log("Error occurred while connecting to DB",error)});

module.exports = mongoose;