const mongoose = require('mongoose');
const { warehouses } = require('./storeDB');
const paginate = require('paginate')({
    mongoose: mongoose
});
const {authtoken} = require('./token')




app.get('/warehouses/:page',authtoken, function(req, res, next) {
    var perPage = 20
    var page = req.params.page || 1

    warehouses
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, warehouse) {
            warehouses.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('../views/warehousepreview', {
                    data: warehouse,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})




module.exports.itemspagination=app