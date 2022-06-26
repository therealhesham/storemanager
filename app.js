
const express= require("express")
const jwt =require('jsonwebtoken')
const ejs = require("ejs")
const mongoose =require('mongoose')

// const helmet = require("helmet");
const cookieParser = require('cookie-parser')
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

const {appregister}=require('./modules/routerRegister')
const {appupload}=require('./modules/ReportRouter')
const {appstore}=require('./modules/storeRoute')


const paginate = require('paginate')({
    mongoose: mongoose
});
const {itemspagination}=require('./modules/paginate')
const {itemspaginationsec}=require('./modules/paginatemainwarehouse')

const {reports} = require('./modules/reportDB')
const {user} = require('./modules/adminDB')
const {listall}=require('./modules/storelistings')
const {warehouses} = require('./modules/storeDB')
require('dotenv').config({ path: './secrets' })
const {applist} = require('./modules/storelistings')
const {loginAuth,authtoken,checkadmin,checksector} = require('./modules/token')
const {loginapp} = require('./modules/login')
const path = require('path')

var XLSX = require('xlsx');
const  appcar  = require("./modules/carRoute")

app = express()
// app.use(helmet());
app.use(cookieParser())
app.set('view engine','ejs')
app.use( express.static(path.join(__dirname, 'public')))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(appregister)
app.use(itemspagination)
app.use(itemspaginationsec)
app.use(appupload)
app.use(appstore)
app.use(appcar)
app.use(applist)
app.use(loginapp)
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    })

app.get('/viewitem',async(req,res)=>
{

    const finder = await listall.find()
    res.setHeader("Access-Control-Allow-Origin", "*");

res.send(finder)

}


)
app.get('/logout',(req,res) => {
    
    res.clearCookie('token','/');
    

  
    res.redirect('/');
});

app.get('/',async (req,res)=>{


    res.render("home")
    
    })
    app.get('/refunditems',async (req,res)=>{


        res.render("refund")
        
        })
    app.get('/storelisting',checksector,(req,res)=>{


        res.render('storelisting')
        
        })


        app.get('/storemanager',authtoken,(req,res)=>{


            res.render('storemanager')
            
            })

        app.get('/login',loginAuth,(req,res)=>{


            res.render('login')
            
            })

            app.get('/failedlogin',loginAuth,(req,res)=>{


                res.render('failedlogin')
                
                })
                app.get('/failedloginpassword',loginAuth,(req,res)=>{


                    res.render('failedloginpassword')
                    
                    })
        app.get('/login',loginAuth,(req,res)=>{


            res.render('login')
            
            })
            app.get('/view',async (req,res)=>{


                const finder = await warehouses.find()
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.send(finder)
                
                })
    

    // app.get('/storeadmin',(req,res)=>{


    //     res.render('storemanager')
        
    //     })
    app.get('/storecar',checksector,(req,res)=>{

        




        tokens=req.cookies.token
        const decoded = jwt.verify(tokens,"process.env.TOKEN")
        console.log(decoded);
        listall.find({}, function(err, listall){
          if(err){
              console.log(err);
          }else{
                  user.findOne({_id:decoded._id}, function(err, user){
          if(err){
              console.log(err);
          }else{
              res.render('storecar', {data:listall, users :user});
          }
        });
          }
        });
        })

    app.get('/storeitems',checksector,(req,res)=>{

        




        tokens=req.cookies.token
        const decoded = jwt.verify(tokens,"process.env.TOKEN")
        console.log(decoded);
        listall.find({}, function(err, listall){
          if(err){
              console.log(err);
          }else{
                  user.findOne({_id:decoded._id}, function(err, user){
          if(err){
              console.log(err);
          }else{
              res.render('storeitems', {data:listall, users :user});
          }
        });
          }
        });
        })
       
        app.get('/index',checksector, function(req, res){   
            tokens=req.cookies.token
            const decoded = jwt.verify(tokens,"process.env.TOKEN")
            console.log(decoded);
            listall.find({}, function(err, listall){
              if(err){
                  console.log(err);
              }else{
                      user.findOne({_id:decoded._id}, function(err, user){
              if(err){
                  console.log(err);
              }else{
                  res.render('index', {data:listall, users :user});
              }
            });
              }
            });
        });




app.get('/succssfulstore',(req,res)=>{
    tokens=req.cookies.token
    const decoded = jwt.verify(tokens,"process.env.TOKEN")
  listall.find({}, function(err, listall){
          if(err){
              console.log(err);
          }else{
                  user.findOne({_id:decoded._id}, function(err, user){
          if(err){
              console.log(err);
          }else{
              res.render('succssfulstore', {data:listall, users :user});

    
    
            }
        });
          }
        });
    });


    
    app.get("/delete/:_id",checkadmin,async(req,res)=>{
       
        _id = req.params._id
        
    const delet = await warehouses.findByIdAndDelete(_id)
    res.redirect("/warehouses/1")
             })
             app.get("/deletefromstore/:_id",checkadmin,async(req,res)=>{
       
                _id = req.params._id
                
            const delet = await listall.findByIdAndDelete(_id)
            res.redirect("/mainwarehouse/1")
                     })

             app.get("/warehousepreviewerror/:page",authtoken,async(req,res)=>{

                var perPage = 9
                var page = req.params.page || 1
            
                warehouses
                    .find({})
                    .skip((perPage * page) - perPage)
                    .limit(perPage)
                    .exec(function(err, warehouse) {
                        warehouses.count().exec(function(err, count) {
                            if (err) return next(err)
                            res.render('warehousepreviewerror', {
                                data: warehouse,
                                current: page,
                                pages: Math.ceil(count / perPage)
                            })
                        })
                    })
            })
                    

             app.get('/registerengineer',(req,res)=>{


                res.render('registerengineer')
                
                })

                app.get('/news',(req,res)=>{


                    res.render('news')
                    
                    })
    
                app.get('/errorregisterpassword',(req,res)=>{


                    res.render('errorpasswordregister')
                    
                    })
    
                    app.get('/errorregisterid',(req,res)=>{


                        res.render('errorregisterid')
                        
                        })
                app.get('/errorregister',(req,res)=>{


                    res.render('errorregister')
                    
                    })


                    app.get('/joierror',(req,res)=>{


                    res.render('joierror')
                    
                    })
app.get('/itemstable', function(req, res) {
    warehouses.find({}).exec(function(err, warehouses) {
        if (err) throw err;
        res.render('admin', { data: warehouses});
    });
});
app.get('/exportdata',async (req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
    user.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
});

    app.post('/exportuser',async (req,res)=>{
        
        stores= req.body.store
        var wb = XLSX.utils.book_new(); //new workbook
        
        const users = await listall.find({store:stores})
          
                var temp = JSON.stringify(users);
                temp = JSON.parse(temp);
                var ws = XLSX.utils.json_to_sheet(temp);
                var down = __dirname+'/exportdata.xlsx'
               XLSX.utils.book_append_sheet(wb,ws,"sheet1");
               XLSX.writeFile(wb,down);
               res.download(down);
   
    
});



app.get('/exportdatastore',async (req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
    warehouses.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
});



const PORT = process.env.PORT || 8080 


app.listen(PORT, ()=> console.log("welcome express"))