


const express = require('express')
const jwt = require('jsonwebtoken')
const {user} = require('./adminDB')

app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

async function checkadmin(req,res,next){
    const decode = req.cookies.token
    if(!decode)return res.redirect('/warehousepreviewerror/1')
    const decoder = jwt.verify(decode ,"process.env.TOKEN")
    
    const findbyid = await user.findOne({_id:decoder._id})
    
    if(!findbyid.isAdmin) return res.redirect('/warehousepreviewerror/1');
    
    
    next()
}
async function checksector(req,res,next){
  const decode = req.cookies.token
  if(!decode)return res.redirect('/login')
  const decoder = jwt.verify(decode ,"process.env.TOKEN")
  
  const findbyid = await user.findOne({_id:decoder._id})
  console.log(findbyid);
  if(findbyid.sector === null) return res.redirect('/storemanager');
  if(findbyid.sector != "مخازن") return res.redirect('/storemanager');
  
  
  next()
} 
  

// console.log("hi");

  function authtoken (req,res,next){
  try {
    
    

if(!req.cookies.token)return res.redirect("/login")
           decode = req.cookies.token
       
        const decoded =   jwt.verify(decode,"process.env.TOKEN")
  console.log(decoded);
    if(!decoded)return res.redirect('/login')
   
        next()
  } 
  catch (error) {
 

        }}






function loginAuth (req,res,next){

          try {
            const tokens = req.cookies.token
        

            const decoded = jwt.verify(tokens,"process.env.TOKEN")
            console.log(decoded);
        if(decoded)return res.redirect('/storemanager')
           
          } catch (error) {
              console.log(error);
            next()
}}    


function adminloginauth(req,res,next){
  try{

const decode = req.cookies.token
if(!decode)return next()
decoder = jwt.verify(decode,process.env.token)
if(decoder)return res.redirect('/adminaccount')
next()
  }
  catch (err){
    console.log(err);
  }





}

function adminauth(req,res,next) {
  try{
  const decode = req.cookies.token
  const decoder = jwt.verify(decode , process.env.token)
  if(!decoder)return res.redirect('/adminsitelogin')

  next()

  }catch(err)
  {

    console.log(err.message);
  }








  }





module.exports.adminloginauth=adminloginauth
module.exports.adminauth=adminauth
module.exports.authtoken=authtoken
module.exports.loginAuth=loginAuth
module.exports.checkadmin=checkadmin
module.exports.checksector=checksector