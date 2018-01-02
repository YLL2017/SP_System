var express = require('express');
var router = express.Router();
var order = require('../models/order');
var Order_Product = require('../models/Order_Product');
var Product = require('../models/Product');
var Customer = require('../models/Customer');
var Customer_Order = require('../models/Customer_Order');


router.get('/', function(req, res, next) {
  console.log(req.session.order.id);
    var customers_id=new Array();
    var customers_name=new Array();
    var products_id=new Array();
    var products_name=new Array();
    var products_price=new Array();

    Product.getAll(function(err,Products){
        if(err) {
            res.status = err.code;
            res.json(err);
        } else {

        }
    })
    Customer.getAll(function(err,Customers){
        if(err) {
            res.status = err.code;
            res.json(err);
        } else {
            for(i=0;i<Customers.length;i++){
                customers_id[i]=Customers[i].Customer_ID;
                customers_name[i]=Customers[i].Name;
            }
            res.render('order', {
                title: 'newOrder' ,
                products_id:products_id,
                products_name:products_name,
                products_price:products_price,
                customers_id:customers_id,
                customers_name:customers_name

            });
        }
    })



});
router.post('/', function(req, res, next) {

  //首先必須先產生出一個Member的物件在進行save
  var newCuOrder = new Customer_Order({
      OrderForm_ID : req.session.order.id,
      Customer_ID : req.body.customer
  });
    console.log(newCuOrder.OrderForm_ID);
    console.log(newCuOrder.Customer_ID);
  newCuOrder.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      req.session.CuOrder = newCuOrder;
      res.redirect("/newOrder");
    }
  });
});




module.exports = router;
