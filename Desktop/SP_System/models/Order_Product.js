var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');
var order = require('../models/order');


var Order_Product = function(options) {
  this.id=options.id;
  this.Order_ID = options.Order_ID;
  this.Product_ID = options.Product_ID;
  this.quantity = options.quantity;
};

Order_Product.getAll = function(cb) {
  db.table('Order_Product')
  .innerJoin('Product', function() {
  this.on('Order_Product.Product_ID', '=', 'Product.Product_ID')
})
    // .from('Order_Product')
    .map(function(row) {
      return({
        id:row.id,
        Order_ID : row.Order_ID,
        Product_ID : row.Product_ID,
        Name:row.Name,
        quantity : row.Quantity
      });
    })
    .then(function(orders) {
      console.log(orders);
      cb(null, orders);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

Order_Product.get = function(req, cb) {
  db.select("*")
  .from("Order_Product")
  .where('id',req)
  .map(function(row) {
  //將select出來的資料轉換成Member物件
  return new Order_Product({
    id: row.id,
    Order_ID : row.Order_ID,
    Product_ID : row.Product_ID,
    quantity : row.Quantity
      });
    })
    // .map(function(row) {
    //   //將select出來的資料轉換成Member物件
    //   return new order(row);
    // })
    // .update({json_data: JSON.stringify(mightBeAnArray)})
    .then(function(orders) {
      if(orders.length) {
        console.log(orders);
        // console.log(orders[].Quantity);
        cb(null, orders);
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
  .then(function(){
        cb(null);
     })
.catch(function(err) {
  // All the error can be checked in this piece of code
  console.log(err);
})
};

//instance fnuction
Order_Product.prototype.save = function (cb) {
  if(this.Order_ID) {
    db('Order_Product')
    .insert({
      Order_ID:this.Order_ID,
      Product_ID : this.Product_ID,
      quantity : this.quantity
    })
      .then(function() {
        cb(null);
      })
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      })
    }else {
    db('Order_Product')
      .insert({
        Order_ID:this.Order_ID,
        Product_ID : this.Product_ID,
        quantity : this.quantity
      })
      .then(function(result) {
        this.id = result[0];
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      });
  }
};

Order_Product.prototype.edit = function(req, cb){
  db('Order_Product')
  .update({
    Product_ID : this.Product_ID,
    quantity : this.quantity
  })
  .where('id',req)
  .then(function(){
        cb(null);
     })
.catch(function(err) {
  console.log(err);
})
};

Order_Product.countQuantity = function(req, cb){
  db.select('Product_ID')
  .from('Order_Product')
  .sum('quantity as sales')
  .groupBy('Product_ID')
  .orderBy('sales', 'desc')
  .map(function(row) {
  //將select出來的資料轉換成Member物件
  return ({
    Product_ID : row.Product_ID,
    quantity : row.sales
      });
    })
  .then(function(list){
    cb(null,list);
  })
  .catch(function(err) {
  // All the error can be checked in this piece of code
  console.log(err);
})
};
Order_Product.countSale = function(req, cb){
    db.select('*')
        .from('Order_Product')
        .innerJoin('Product', function() {
            this.on('Order_Product.Product_ID', '=', 'Product.Product_ID')
        }).as('Order_P')
        .sum('quantity as sales')
        .groupBy('Order_Product.Product_ID')
        .orderBy('sales', 'desc')
        .map(function(row) {
            //將select出來的資料轉換成Member物件
            return ({
                Product_ID : row.Product_ID,
                Name:row.Name,
                quantity : row.sales

            });
        })
        .then(function(list){
            // console.log(list);
            cb(null,list );
        })
        .catch(function(err) {
            // All the error can be checked in this piece of code
            console.log(err);
        })
};
Order_Product.countAmount = function(req, cb){
    db.table('Order_Product')
        .innerJoin('Product', function() {
            this.on('Order_Product.Product_ID', '=', 'Product.Product_ID')
        }).as('Order_P')
        .select('*')
        .select(db.raw('SUM(??*??) as amount',['Order_Product.quantity','Product.Price']))
        //.sum(db.raw('??*?? as ?',['Order_Product.quantity','Product.Price','amount']))
        .groupBy('Order_Product.Order_ID')
        .map(function(row) {
            return ({
                Order_ID:row.Order_ID,
                amount:row.amount
            });
        })
        .then(function(list){
            // console.log(list);
           // Order_Product.countAmount(null,list);

            cb(null,list);
        })
        .catch(function(err) {
            // All the error can be checked in this piece of code
            console.log(err);
        })
};


Order_Product.delete = function(req, cb){
     db.del("*")
     .from("Order_Product")
     .where('id',req)
     .then(function(){
           cb(null);
        })
   .catch(function(err) {
     // All the error can be checked in this piece of code
     console.log(err);
   })
 };




module.exports = Order_Product;
