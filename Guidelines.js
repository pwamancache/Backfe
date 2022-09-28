const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/local',()=>{
    console.log('connected to local')
})

const GuidelinesSchema = mongoose.Schema({
    id:Number,
    Title:String,
    body:String
})



module.exports = mongoose.model("Guidelines",GuidelinesSchema)