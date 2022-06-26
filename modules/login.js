const express=require('express')
const { Router } = require("express")

const { user , engineerUser  } = require ('./adminDB')
const bcrypt = require ('bcrypt')
const jwt=require('jsonwebtoken')
const { authtoken,loginAuth } = require('./token')


const cookieParser = require('cookie-parser')



app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))






app.post('/login',async function (req,res){

    const findonDataBase = await user.findOne({username:req.body.username})
    console.log(findonDataBase);
    if(!findonDataBase)return res.redirect  ('/failedlogin')
    const comparer = await bcrypt.compare(req.body.password,findonDataBase.password)
if(!comparer) return res.redirect('/failedloginpassword')
    maxage=1000*60*60*1
const token = jwt.sign({_id:findonDataBase.id},"process.env.TOKEN",{expiresIn: maxage})
    console.log(token);              
res.cookie('token',token,{httpOnly:true,secure:true,maxAge:maxage*1000})

    
    res.redirect('/storemanager')
    
    
    
    
    })


module.exports.loginapp=app