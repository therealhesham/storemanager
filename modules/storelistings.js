const express = require("express");
const { string } = require("joi");
const {mongoose}=require('./adminDB')
const {warehouses}=require('./storeDB')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))   


const mainwarhouses = new mongoose.Schema({
   

    
    
    store:String,
    items:String,
    type:String,
    
    quantity:{type:Number,required:true}
      })



      const listall = mongoose.model('mainwarhouses',mainwarhouses)


    //   module.exports.warehouses=warehouses



app.post("/storelistings",async(req,res)=>{
  
try {
    const warehouse = new listall({
        
        
        
        
        store:req.body.store,
        items:req.body.items,
        type:req.body.type,
        
        quantity:req.body.quantity
        
    })
  
const find = await listall.findOne( {store:req.body.store,
    items:req.body.items})


    
if(find) return res.render("../views/previouslyinserted")
        const saver = await warehouse.save();
        
        res.render("../views/successfullisting")
        
} catch (err) {
    console.log(err);
    if(err) return res.render("../views/failedlisting")
    
}
   
        })
        
       module.exports.listall=listall 
module.exports.applist=app