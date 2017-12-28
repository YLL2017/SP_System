var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');
var Order_Product = require('../models/Order_Product');

var order = function(options) {
  this.id = options.id;
  this.systime = options.systime;
  this.O_amount=options.O_amount;
};
order.getAll = function(month, cb) {
  console.log(month[0]);
  db.select("*")
  .from("Order_Form")
  // .where('systime','like',   '% %')
  .innerJoin('Order_Product', function() {
  this.on('Order_Product.Order_ID', '=', 'Order_Form.Orderform_ID')
  

})
  .map(function(row) {
  return new Order_Product({
    id: row.id,
    Order_ID : row.Order_ID,
    Product_ID : row.Product_ID,
    quantity : row.quantity
      });
    })
    .then(function(orders) {
      if(orders.length) {
        console.log(orders);
        // console.log(orders[].Quantity);
        cb(null, orders);
      } else {
        cb(new GeneralErrors.NotFound());
      }
    })
  .catch(function(err) {
    // All the error can be checked in this piece of code
    console.log(err);
  })
};


order.prototype.save = function (cb) {
  if (this.id) {
    //已存在
    db("Order_Form")
      .where({
        Orderform_ID : this.id
      })
      .update({
          O_amount:this.O_amount
      })
      .then(function() {

        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("ORDER UPDATED", err);
        cb(new GeneralErrors.Database());
      });
  } else {
    db("Order_Form")
      .insert({
        systime: this.systime,
        O_amount:this.O_amount
      })
      .then(function(result) {
        this.id = result[0];
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("ORDER INSERT", err);
        cb(new GeneralErrors.Database());
      });
  }
};
order.prototype.edit = function(req, cb) {
    db('Order_Form')
        .update({
            O_amount: this.amount
        })
        .where('Orderform_ID', req)
        .then(function () {
            cb(null);
        })
        .catch(function (err) {
            console.log(err);
        })
};

module.exports = order;
