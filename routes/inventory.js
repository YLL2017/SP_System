var express = require('express');
var router = express.Router();
var order = require('../models/order');
var Order_Product = require('../models/Order_Product');
var Material = require('../models/Material');



    router.get('/', function(req, res, next) {
        Material.getAll(function(err,Materials) {
            if(err) {
                res.status = err.code;
                res.json(err);
            } else {
                for(i=0;i<Materials.length;i++){
                    Materials[i].Stock= 500 - 55*(Materials[i].days%9);
                    console.log(Materials[i].Stock)
                }
                res.render('inventory', { title: 'Inventory',Materials:Materials });




                    }


                })
});


module.exports = router;
