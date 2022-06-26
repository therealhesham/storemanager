const express = require("express");
const { string } = require("joi");
const {mongoose}=require('./adminDB')
const {cars}=require('./carDB')
const jwt = require ("jsonwebtoken")
app.post("/carinsert",async(req,res)=>{
  

    const newcar = new cars({
        
        
        
        
        
        driver:req.body.driver,
        
        from:req.body.from
        
    })
  const saver = await newcar.save()
  const jwter=  jwt.sign(saver.driver,"token")
  res.header("token",jwter)
console.log(saver)
        })
        
        
module.exports.appcar=app