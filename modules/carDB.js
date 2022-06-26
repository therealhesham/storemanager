
const {mongoose}=require('./adminDB')



const car = new mongoose.Schema({
    driver:String,
    from:String,
    
  
      })



      const cars = mongoose.model('car',car)


      module.exports.cars=cars