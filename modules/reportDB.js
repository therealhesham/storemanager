    
const {mongoose}=require('./adminDB')





const report = new mongoose.Schema({
  cityName:String,
  project:String,
  contractor:String,
  Team:Number,
 tasks:String,
 details:String
    })
    


const reports = mongoose.model('reports',report)


    module.exports.reports=reports