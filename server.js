const express = require('express')
const cors = require('cors')
const path= require('path')
const Users = require('./Users')
const Widgets = require('./Widgets')
const Guidelines = require('./Guidelines')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const SECRET_KEY = '663456789'
const expiresIn = '365d'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
const mongoDB = 'mongodb://127.0.0.1:27017/local';

mongoose.connect(mongoDB, ()=>{
    console.log('connected to db')
},
console.log('error connecting ')
);
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn
    })
   
}
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}
/*app.post('/addscreen',(req,res) =>
{
    console.log('here in post')
    let objwidget = {id :req.body.id,
    name : req.body.name,
    url : req.body.url,
    position : req.body.position
    }
    savewidget(objwidget)
    res.send('hellow')
})*/



app.post('/addscreenall',(req,res) =>
{
    const alldocs = req.body
    savewidgetAll(alldocs)
})

async function savewidgetAll(wid)
{
    try{
    const widgetclean = await widgets.deleteMany({})
    const widget = await widgets.insertMany(wid)
    console.log(widget)
    }
    catch(e)
    {
        console.log(e)
    }
}

app.get('/widget',(req,res)=>
{
    let widg = [{}]
    async function widgetsall(){
        widg = await getwidget()
       // console.log('inside get' + widg)
        res.send(widg)
        
    }
   widgetsall()
   
   
})

app.get('/guidelines',(req,res)=>
{
    let guides = [{}]
    async function guidelinesAll(){
        guides = await getGuidelines()
       console.log('inside get' + guides)
        res.send(guides)
        
    }
   guidelinesAll()
   
   
})

/*async function savewidget(wid)
{
    console.log("saving widget to db ")
    try{
    const widget = new widgets(wid)
    const widgetsaved = await widget.save()
    
    console.log(usersaved)
    }
    catch(e)
    {
        console.log(e)
    }
}*/

async function getwidget()
{
    let widgetery = [{}]
    try{
     widgetery = await Widgets.find()
    }
    catch(e)
    {
        console.log(e)
    }
    return widgetery
}

 async function getGuidelines()
{
    console.log("getting guidelines to db ")
    let Guidelinesall = []
    try{
     Guidelinesall = await Guidelines.find()
    console.log('here are guidelines ' + Guidelinesall )
    }
    catch(e)
    {
        console.log(e)
    }
    return Guidelinesall
}


app.listen(8000,()=>
{
    console.log('Running API')
})


app.post("/register",(req,res)=>{

    console.log("Register user " + req.body)
    let rname = req.body.name
    let email = req.body.email
    let password = req.body.password
    let brand = req.body.brand

    savetodb(rname,email,password,brand)
    //res.send('success')
    res.status(200).json({
        message:'User created',
        status:'200'
    })

})
async function savetodb(sname,semail,spassword,sbrand)
{
    console.log("saving to db ")
    try{
        
    const user = new Users({name:sname,email:semail,password:spassword,brand:sbrand})
    const usersaved = await user.save()
    console.log(usersaved)
    }
    catch(e)
    {
        console.log(e)
    }
}

//savetodb()

app.post('/login',(req,res)=>
{
   
    const result = run(req.body.email,res)
 
    
})

async function isAuthenticated(
    semail
) {
    //return userdbs.users.findIndex(user => user.username === email && user.password === password) !== -1
    const user = await Users.find({email:semail},"_id")
    console.log('yes user is here ' + user)
    if (user !== {})
    {
        return true
    }
    else
    {
        return false
    }
    
}

async function run(semail,resp)
{
    console.log('runningnnnn')
    try{
        console.log('in try' )
      
        if (isAuthenticated(semail))
       {
        /*const status= 200
        const message= "success"
        resp.status(status).json({
            status,
            message
        }) */
        const access_token = createToken({
            semail
        })
        console.log("Access Token:" + access_token);
        resp.status(200).json({
            access_token
        })
    }
    else
    {
        const status = 401
        const message = "failed"
        resp.status(status).json({
            status,
            message
        })
    }
    return
    
    }
    catch(e)
    {
        console.log('Error is  ' + e)
    }
}
//run()

