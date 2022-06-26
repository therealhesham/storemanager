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


app.post("/storeitems",async(req,res)=>{


    
        const tokens = req.cookies.token
    

        const decoded = jwt.verify(tokens,"process.env.TOKEN")
        const findbyid = await user.findOne({_id:decoded._id})

        
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var dateTime = date+' '+time;
    // const {error} = validstoreitems(req.body)
    // if(error)return res.send(error);


try {
    const warehouse = new warehouses({
        date:dateTime,
        transaction:req.body.transaction,
        from:req.body.from,
        to:req.body.to,
        contractor:req.body.contractor,
        items:req.body.items,
        location:req.body.location,
        type:req.body.type,
        quantity:req.body.quantity,
        tasks:req.body.tasks,
        details:req.body.details,
        by:findbyid.username
    
    })


        const ward = new warehouses({

            date:dateTime,
            transaction: " تحويل وارد",
            
            from:req.body.from,
            
            items:req.body.items,
            location:req.body.location,
            type:req.body.type,
            quantity:req.body.quantity,
            tasks:req.body.tasks,
            details:req.body.details

        })
        const monsaref = new warehouses({

            date:dateTime,
            transaction: "تحويل منصرف",
            
            to:req.body.to,
            contractor:req.body.contractor,
            items:req.body.items,
            location:req.body.location,
            type:req.body.type,
            quantity:req.body.quantity,
            tasks:req.body.tasks,
            details:req.body.details

        })
  
        
        
const findinstore = await listall.findOne({items:req.body.items,store:req.body.from})
const findinstoreplus = await listall.findOne({items:req.body.items,store:req.body.contractor})

// if (findinstoreplus.id == findinstore.id ) return res.render("../views/failedstore")
console.log(findinstore);
console.log(findinstoreplus);
console.log(req.body);

if(warehouse.quantity == null) return res.render("../views/failedstore")

        if(req.body.transaction  == "وارد"){
            if(req.body.from != "القاهره")
{

    if(findinstoreplus.type != req.body.type)  return  res.render("../views/failedtype")

        Fawn.Task()
        .save("warehouses",warehouse)
        .update("mainwarhouses",{_id:findinstore._id},{"$inc": {"quantity":   - req.body.quantity} })
        .update("mainwarhouses",{_id:findinstoreplus._id},{"$inc": {"quantity":   + req.body.quantity} }).run()
        res.render("../views/succssfulstore")
}     
else{
    if(findinstoreplus.type != req.body.type)  return  res.render("../views/failedtype")
    Fawn.Task()
    .save("warehouses",warehouse)
    .update("mainwarhouses",{_id:findinstoreplus._id},{"$inc": {"quantity":   + req.body.quantity} }).run()
    res.render("../views/succssfulstore")
         

}
}
        else if(req.body.transaction  ==  "خصم على المقاول"){
            if(findinstore.type != req.body.type)  return  res.render("../views/failedtype")
            Fawn.Task()
            .save("warehouses",warehouse)
            .update("mainwarhouses",{_id:findinstore._id},{"$inc": {"quantity":   - req.body.quantity} }).run()
            res.render("../views/succssfulstore")
        }
        else if(req.body.transaction  ==  "مرتجع"){
            if(findinstoreplus.type != req.body.type)  return  res.render("../views/failedtype")
            Fawn.Task()
            .save("warehouses",warehouse)
            .update("mainwarhouses",{_id:findinstoreplus._id},{"$inc": {"quantity":   + req.body.quantity} }).run()

            
            res.redirect('/refunditems')
        }
        else if(req.body.transaction  ==  "منصرف"){
            if(findinstore.type != req.body.type)  return  res.render("../views/failedtype")
            Fawn.Task()
            .save("warehouses",warehouse)
            .update("mainwarhouses",{_id:findinstore._id},{"$inc": {"quantity":   - req.body.quantity} }).run()


            res.render("../views/succssfulstore")
        }
        else if(req.body.transaction  ==  "تشغيل"){
            if(findinstore.type != req.body.type)  return  res.render("../views/failedtype")
            Fawn.Task()
            .save("warehouses",warehouse)
            .update("mainwarhouses",{_id:findinstore._id},{"$inc": {"quantity":   - req.body.quantity} }).run()


            res.render("../views/succssfulstore")
        }
        else if(req.body.transaction  == "تحويلات"){
            if(findinstoreplus.type != req.body.type)  return  res.render("../views/failedtype")
            Fawn.Task()
            .save("warehouses",warehouse)
            .update("mainwarhouses",{_id:findinstore._id},{"$inc": {"quantity":   - req.body.quantity} })
            .update("mainwarhouses",{_id:findinstoreplus._id},{"$inc": {"quantity":   + req.body.quantity} }).run();
            const savemons = await monsaref.save()
            const saveward= await ward.save()
        
            res.render("../views/succssfulstore")
         
        }
        else{
        const savenewdata = await warehouse.save()
        res.render("../views/succssfulstore")
        }
} 
catch (error) {
    console.log(error);
    if(error) return res.render("../views/failedstore")
}
   
        })
        
        

        module.exports.appstore=app