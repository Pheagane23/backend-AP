const mongoose = require('mongoose')

 



const userSchema = mongoose.Schema({

    username : {type: String, required: true },

    password : {type :String, required: true},

    name : {type :String, required: true},

    surname : {type :String, required: true},

    emailAddress : {type :String, required: true}

})

 

module.exports = mongoose.model('users', userSchema);