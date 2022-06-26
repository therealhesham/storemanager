const express = require("express");
const {warehouses}=require('./storeDB')
const{listall}=require('./storelistings')
const {user} = require('./adminDB')
const jwt = require('jsonwebtoken')
const {validstoreitems}=require('./joistore')
const Fawn = require('fawn')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))   
// Fawn.init("mongodb://localhost/uploads");
Fawn.init(process.env.Mongo_Link)


app.post("/search",async(req,res)=>  {


const search = await warehouses.find({items:req.body.items})


res.render('listedsearchitems', {datas:search})




})

