var db = require('./db');
var async = require('async');

db.select()
.table('Order_Product')
.then(function(result) {
  res.json(result);
})
.catch(function(err) {
  console.log(err);
});
