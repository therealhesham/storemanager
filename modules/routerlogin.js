const express = require('express')
const {user , engineerUser}= require('./adminDB')



app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))    


app.post('/login',async(req,res)=>
{

    const finder = await engineerUser.findOne({username:req.body.username})

if(!finder) return res.send('not registered in database')

if(req.body.password!=finder.password) return res.send('password error')

res.send('login')



}
)