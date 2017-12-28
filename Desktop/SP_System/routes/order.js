var express = require('express');
var router = express.Router();
var order = require('../models/order');
var Order_Product = require('../models/Order_Product');

router.get('/', function(req, res, next) {
    res.render('order', { title: 'Order' });
});

router.post('/', function(req, res, next) {

    //首先必須先產生出一個Member的物件在進行save
    var newOrder = new order({
    });

    newOrder.save(function(err) {
        if(err) {
            res.status = err.code;
            res.json(err);
        } else {
            req.session.order = newOrder;
            res.redirect("/customer");
        }
    });
});
router.post('/logout', function(req, res, next) {
    console.log(req.session.order.id);
    req.session.CuOrder=null;
    req.session.order = null;
    res.redirect('/');
});


module.exports = router;