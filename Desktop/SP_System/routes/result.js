var express = require('express');
var router = express.Router();
var order = require('../models/order');
var Order_Product = require('../models/Order_Product');
var Product = require('../models/Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Order_Product.countSale(1,function(err,list){
    if(err){
      res.status(err.code);
      res.json(err);
    }else{
      var list1=new Array();
      var list2=new Array();
      for(i=0;i<list.length;i++){
        list1[i]=list[i].Name;
        list2[i]=list[i].quantity;
      }

      // console.log(list); //testline
      res.render('chart', { title: 'searchOrder',
      list:list,
      list1:list1,
      list2:list2,
       });
    }
  })
});

module.exports = router;
