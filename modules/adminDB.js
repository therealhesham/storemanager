const mongoose = require('mongoose')



mongoose.connect(process.env.Mongo_Link)



const engineerUser = new mongoose.Schema({
    username : {type:String,required:true,minlength:8,unique:true},
    password:{type:String,required:true,minlength:8},
    repeatpassword:{type:String,required:true,minlength:8},
    // adminPassword:String,
    birthdate:{
        type: Date,
        required: true,
        trim: true,
    },
    email:{type:String,required:true,unique:true},
    idnumber:{type:Number,required:true,unique:true},
    address:{type:String,required:true,minlength:5},
    sector:{type:String,required:false},
    isAdmin:{type:Boolean,default:false}
    })
    const idnumbers = new mongoose.Schema({
        idnumber:Number
        })
        

const user = mongoose.model('engineerUser',engineerUser)
const idnumber = mongoose.model('idnumber',idnumbers)











    module.exports.engineerUser=engineerUser
    module.exports.user=user
    module.exports.idnumber=idnumber
module.exports.mongoose=mongoose

