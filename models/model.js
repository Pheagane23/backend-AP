const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    task : {type: String, required: true },
    description : {type :String, required: true
    },
    status: {type:String, required: true}
})

module.exports = mongoose.model('task', taskSchema);