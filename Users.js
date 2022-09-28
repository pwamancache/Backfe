const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/local',()=>{
    console.log('connected to local')
})

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    brand:String
})

module.exports = mongoose.model("Users",userSchema)