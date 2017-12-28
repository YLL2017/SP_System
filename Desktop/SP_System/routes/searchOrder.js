var express = require('express');
var router = express.Router();
var order = require('../models/order');
var Order_Product = require('../models/Order_Product');


router.get('/', function(req, res, next) {
 

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

router.post('/', function(req, res, next) {
  Order_Product.countAmount(function(err, orders){
      if(err){
          res.status(err.code);
          res.json(err);
      }else{

      }
  })
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

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  // console.log(req.params.id); //testline
  // console.log(id); //testline
  Order_Product.delete(id,function(err,rows){
    if(err) {
  res.status = err.code;
  res.json(err);
  } else {
    res.redirect("/searchOrder");
    res.render('searchOrder', {
      title: 'searchOrder',
      orders:orders
    });
  }
})
});


router.get('/edit/:id',function(req, res, next) {
  var id = req.params.id;
  Order_Product.get(id,function(err, orders){
    if(err){
      res.status(err.code);
      res.json(err);
    }else{
      res.render('edit', {
        title: 'edit',
        orders:orders,
       });
    }
  })
});

router.post('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var editOrderProduct=new Order_Product({
    id:req.params.id,
    Order_ID : req.body.Order_ID,
    Product_ID : req.body.Product_ID,
    quantity : req.body.quantity
  });
  // console.log(input); //testline
  console.log(req.body.Product_ID);
  // console.log(id); //testline
  editOrderProduct.edit(id,function(err,orders){
    if(err) {
  res.status = err.code;
  res.json(err);
  } else {
    res.redirect("/searchOrder");
    res.render('searchOrder', {
      title: 'searchOrder',
      orders:orders
    });
  }
})
});




module.exports = router;
