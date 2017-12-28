var express = require('express');
var router = express.Router();
var order = require('../models/order');
var Order_Product = require('../models/Order_Product');
var RFM=require('../models/RFM');


    router.get('/', function(req, res, next) {

        Order_Product.countAmount(1,function(err, list){
            if(err){
                res.status(err.code);
                res.json(err);
            }else{
                console.log(list);
                for(i=0;i<list.length;i++){
                    console.log(list[i].Order_ID);
                    var editOrderForm=new order({
                        id : list[i].Order_ID,
                        O_amount : list[i].amount
                    });
                    console.log(editOrderForm.id);//testline

                    editOrderForm.save(function(err) {
                        if(err) {
                            res.status = err.code;
                            res.json(err);
                        } else {
                            //console.log('success');
                        }
                    });
                }
            }
        })
    res.render('index', { title: 'Index' });
    });

module.exports = router;
