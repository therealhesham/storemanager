
const express =require("express")

app = express()

app.use(express.json())
var xlsx = require('node-xlsx');
const fs = require("fs")
const readline=require("readline")
var XLSX = require('xlsx')
// var xlsx = require('node-xlsx');

// var obj = xlsx.parse('./Stage_New_search.xlsx'); // parses a file
const { convertExcelToJson } = require('./convert');

var xlsx = require('node-xlsx');
// var fs = require('fs');

// var csv = require('csv-parser')
// var data = []

// fs.createReadStream('test.csv')
//   .pipe(csv())
//   .on('data', function (row) {
//     data.push(row)
//   })
//   .on('end', function () 
//   {
//   console.log(data)
//     console.log('Data loaded')
//   })
app.get("/", (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("")
    var csv = require('csv-parser')
    var data = []

fs.createReadStream('test.csv')
  .pipe(csv())
  .on('data', function (row) {
    data.push(row)
  })
  .on('end', function () 
  {
    res.send(data) 
    console.log('Data loaded')
  })
// console.log("r")


})





app.listen(3000,()=>console.log("hello"))