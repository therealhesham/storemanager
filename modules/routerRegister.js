const express = require('express')
const {valid} = require('./joivalidator')
const {user,engineerUser,idnumber}= require('./adminDB')
const cookieParser = require('cookie-parser')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './secrets' })
app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))    



app.post('/registerengineer',async(req,res)=>
{


    res.set('Access-Control-Allow-Origin', '*');    
try{
    

    
    
const newRegister = new user({

    username: req.body.username,
    password: req.body.password,
    repeatpassword: req.body.repeatpassword,   
    birthdate: req.body.birthdate,
    idnumber:req.body.idnumber,
    email: req.body.email,   
    address: req.body.address


})
id=req.body.idnumber
if(req.body.password != req.body.repeatpassword) return res.redirect('/errorregisterpassword')
const findid = await idnumber.findOne({idnumber:req.body.idnumber})

if(findid == null) return res.redirect('/errorregisterid')
if(id.length < 14) return res.redirect('/errorregisterid')
const genSAlt = await bcrypt.genSalt(10)
newRegister.password = await bcrypt.hash(req.body.password,genSAlt)
newRegister.repeatpassword = await bcrypt.hash(req.body.repeatpassword,genSAlt)

maxage=1000*60*60*1




const savenewuser = await newRegister.save()
const token = jwt.sign({_id:savenewuser.id},"process.env.TOKEN",{expiresIn: maxage})
    
res.cookie('token',token,{httpOnly:true,secure:true,maxAge:maxage*2000})
res.redirect('/storemanager')
}
catch(error)

{
console.log(error);
if (error) return res.redirect('/errorregister')

}







}
)

module.exports.appregister=app