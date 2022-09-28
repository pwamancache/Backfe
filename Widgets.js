const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/local',()=>{
    console.log('connected to local')
})

const widgetSchema = mongoose.Schema({
    id:Number,
    name:String,
    url:String,
    position:Number
})



module.exports = mongoose.model("Widget",widgetSchema)