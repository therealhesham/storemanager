
const {mongoose}=require('./adminDB')



const warehouse = new mongoose.Schema({
    date:String,
    from:String,
    transaction:String,
    to:String,
    contractor:String,
    type:String,
    quantity:{type:Number,required:true},
    items:String,
    location:String,
    
   tasks:String,
   by:String
      })



      const warehouses = mongoose.model('warehouse',warehouse)


      module.exports.warehouses=warehouses