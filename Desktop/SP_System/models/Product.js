var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');


var Product = function(options) {
  this.Product_ID=options.Product_ID;
  this.Name = options.Name;
  this.Price = options.Price;
};
Product.getAll = function(cb) {
  db.select('*')
    .from('Product')
    .map(function(row) {
      return ({
        Product_ID : row.Product_ID,
        Name : row.Name,
        Price : row.Price 

      });
    })
    .then(function(Products) {
      if(Products.length) {
        // console.log(Products[0]);
        cb(null, Products);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}
module.exports = Product;
