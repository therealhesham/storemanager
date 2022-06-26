const mongoose = require('mongoose');
const { listall } = require('./storelistings');
const paginate = require('paginate')({
    mongoose: mongoose
});
const {authtoken} = require('./token')




app.get('/mainwarehouse/:page',authtoken, function(req, res, next) {
    var perPage = 20
    var page = req.params.page || 1

    listall
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, mainwarhouses) {
            listall.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('../views/mainwarehousepreview', {
                    data: mainwarhouses,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})




module.exports.itemspaginationsec=app