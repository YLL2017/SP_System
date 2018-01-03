var express = require('express');
var router = express.Router();
var order = require('../models/order');
var Customer_Order = require('../models/Customer_Order');
var Customer = require('../models/Customer');


router.get('/', function(req, res, next) {
    var Msplit;
    var Rsplit;
    var Fsplit;
    var MMax;
    var RMax;
    var FMax;

    Customer_Order.countRFM(1,function(err,list){
        if(err){
            res.status(err.code);
            res.json(err);
        }else{
            for(i=0;i<list.length;i++){

                var updateCustomer=new Customer({
                    Customer_ID : list[i].Customer_ID,
                    Rencency : Math.abs(list[i].recentday),
                    Frequency:list[i].Frequency,
                    Monetary:list[i].Monetary
                });
                //console.log(updateCustomer);//testline

                updateCustomer.save(function(err) {
                    if(err) {
                        res.status = err.code;
                        res.json(err);
                    } else {
                        //console.log('success');
                    }
                });
            }

        }

        });

    Customer_Order.countRFM(1,function(err,list){
        if(err){
            res.status(err.code);
            res.json(err);
        }else{
            Customer_Order.countRFMScore(1,function(err,list1,M_split,R_split,F_split,M_Max,R_Max,F_Max){
                if(err){
                    res.status(err.code);
                    res.json(err);
                }else{
                    console.log(list);
                    Msplit=M_split;
                    Rsplit=R_split;
                    Fsplit=F_split;
                    MMax=M_Max;
                    RMax=R_Max;
                    FMax=F_Max;
                    for(i=0;i<list.length;i++){
                        list[i].recentday=Math.abs(list[i].recentday);
                        if(list[i].Monetary<=M_Max && list[i].Monetary>(M_Max-M_split)){
                            list[i].Monetary=1;

                        }else if(list[i].Monetary<=(M_Max-M_split) && list[i].Monetary>(M_Max-2*M_split)){
                            list[i].Monetary=2;

                        }else if(list[i].Monetary<=(M_Max-2*M_split)){
                            list[i].Monetary=3;

                        }
                        if(list[i].recentday<=R_Max && list[i].recentday>(R_Max-R_split)){
                            list[i].recentday=1;

                        }else if(list[i].recentday<=(R_Max-R_split) && list[i].recentday>(R_Max-2*R_split)){
                            list[i].recentday=2;

                        }else if(list[i].Monetary<=(R_Max-2*R_split)){
                            list[i].recentday=3;

                        }
                        if(list[i].Frequency<=F_Max && list[i].Frequency>(F_Max-F_split)){
                            list[i].Frequency=1;

                        }else if(list[i].Frequency<=(F_Max-F_split) && list[i].Frequency>(F_Max-2*F_split)){
                            list[i].Frequency=2;

                        } else if(list[i].Frequency<=(F_Max-2*F_split)){
                            list[i].Frequency=3;

                        }
                        list[i].RFM_Score= list[i].recentday*100+list[i].Monetary*10+list[i].Frequency;
                        //console.log(list[i])
                        var updateCustomer=new Customer({
                            Customer_ID : list[i].Customer_ID,
                            RFM_Score:list[i].RFM_Score
                        });
                        //console.log(updateCustomer);//testline

                        updateCustomer.save(function(err) {
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
            }


    })
    Customer.getAll_RFM(1,function(err,C_RFM){
        if(err){
            res.status(err.code);
            res.json(err);
        }else{
            res.render('searchCustomer', {
                title: 'searchCustomer',
                C_RFM:C_RFM
            });
        }

    });

});


router.post('/', function(req, res, next) {
  Order_Product.getAll(function(err, orders){
    if(err){
      res.status(err.code);
      res.json(err);
    }else{
      res.render('searchOrder', {
        title: 'searchOrder',
        orders:orders
      });
    }
  })
});









module.exports = router;
