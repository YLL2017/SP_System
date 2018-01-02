var express = require('express');
var router = express.Router();
var order = require('../models/order');
var Order_Product = require('../models/Order_Product');
var Product = require('../models/Product');
var Customer = require('../models/Customer');

router.get('/', function(req, res, next) {

  var products_id=new Array();
    var products_name=new Array();
    var products_price=new Array();
  var customers_id=new Array();
  var customers_name=new Array();
  Product.getAll(function(err,Products){
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
        for(i=0;i<Products.length;i++){
            products_id[i]=Products[i].Product_ID;
            products_name[i]=Products[i].Name;
            products_price[i]=Products[i].Price;
        }


        Customer.getAll(function(err,Customers){
            if(err) {
                res.status = err.code;
                res.json(err);
            } else {
                for(i=0;i<Customers.length;i++){
                    customers_id[i]=Customers[i].Customer_ID;
                    customers_name[i]=Customers[i].Name;
                    console.log(customers_id[i])
                }
            }
        })
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
// router.get('/:orderid', function(req, res, next) {
//   order.get(req.params.orderid, function(err, article) {
//     if(err) {
//       console.log(err);
//       next();
//     } else {
//       Order_Product.get(Order_Product.OrderID, function(err, order) {
//         if(err) {
//           console.log(err);
//         } else {
//           Order_Product.order = order;
//         }
//       })
//
//     }
//   });
// });




router.post('/', function(req, res, next) {
  var newOrderProduct=new Order_Product({
    Order_ID : req.session.order.id,
    Product_ID : req.body.product,
    quantity : req.body.quantity
  });
  console.log(newOrderProduct.Order_ID);//testline

  newOrderProduct.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      res.redirect("/newOrder");
    }
  });
});


module.exports = router;
