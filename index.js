
const express =require("express")

app = express()

app.use(express.json())
var xlsx = require('node-xlsx');
const fs = require("fs")

var XLSX = require('xlsx')
// var xlsx = require('node-xlsx');

// var obj = xlsx.parse('./Stage_New_search.xlsx'); // parses a file

// console.log(obj.data)
app.get("/", (req,res)=>{
    res.header("Access-Control-Allow-Origin", "https://nateega.vercel.app/");
    
    res.header({"Access-Control-Allow-Credentials": true});
    var workbook = XLSX.readFile('./Stage_New_Search.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
   
console.log("r")
res.send(xlData)

})





app.listen(3000,()=>console.log("hello"))
