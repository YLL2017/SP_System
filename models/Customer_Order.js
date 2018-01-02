var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');
var order = require('../models/order');

var Customer_Order = function(options) {
    this.id=options.id;
    this.Customer_ID = options.Customer_ID;
    this.OrderForm_ID = options.OrderForm_ID;

};

Customer_Order.getAll = function(cb) {
    db.table('Customer_Order')
        .innerJoin('Customer', function() {
            this.on('Customer_Order.Customer_ID', '=', 'Customer.Customer_ID')
        })
        // .from('Customer_Order')
        .map(function(row) {
            return({
                id:row.id,
                Customer_ID : row.Customer_ID,
                OrderForm_ID : row.OrderForm_ID,
                Name:row.Name,
                Email : row.Email,
                Phone : row.Phone
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

Customer_Order.prototype.save = function (cb) {
    if(this.OrderForm_ID) {
        db('Customer_Order')
            .insert({
                OrderForm_ID:this.OrderForm_ID,
                Customer_ID : this.Customer_ID,

            })
            .then(function(result) {
                console.log(result);
                cb(null,this);
            })
            .catch(function(err) {
                console.log(err);
                cb(null, new GeneralErrors.Database());
            })
    }else {
        db('Customer_Order')
            .insert({
                OrderForm_ID:this.OrderForm_ID,
                Customer_ID : this.Customer_ID,
            })
            .then(function(result) {
                this.id = result[0];
                console.log(result);
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log(err);
                cb(null, new GeneralErrors.Database());
            });
    }
};

Customer_Order.countRFM = function(req, cb){
    db.select('*')
        .from('Customer_Order')
        .innerJoin('Customer', function() {
            this.on('Customer_order.Customer_ID', '=', 'Customer.Customer_ID')
        }).innerJoin('Order_Form',function () {
          this.on('Customer_Order.OrderForm_ID','=','Order_Form.Orderform_ID')
        }).as('Customer_OrderForm_Join')
        //.where(db.raw('DatePart(year,systime)=DatePart(year,getdate()) and DatePart(month,systime)=DatePart(month,getdate())'))
        //.orderBy('systime','desc')
        .max('systime as Recent')
        .select(db.raw('DATEDIFF(max(systime), CURDATE()) as ?','recentday'))
        .count('systime as Frequency')
        .sum('O_amount as Monetary')
        .groupBy('Customer_Order.Customer_ID')
        //.orderBy('Amount', 'desc')
        .map(function(row) {
            return ({
                Customer_ID : row.Customer_ID,
                Name:row.Name,
                Email:row.Email,
                Phone:row.Phone,
                recentday:Math.abs(row.recentday),
                Frequency:row.Frequency,
                Monetary : row.Monetary,
                RFM_Score:row.RFM_Score

            });
        })
        .then(function(list){
            // console.log(list);
            cb(null,list);
        })
        .catch(function(err) {
            // All the error can be checked in this piece of code
            console.log(err);
        })
};

Customer_Order.countRFMScore = function(req, cb){
    var M_split;
    var R_split;
    var F_split;
    var M_Max;
    var R_Max;
    var F_Max;

    db.select('*')
        .from('Customer')
        .max('Monetary as max_Monetary')
        .min('Monetary as min_Monetary')
        .max('Frequency as max_Frequency')
        .min('Frequency as min_Frequency')
        .max('Rencency as max_Rencency')
        .min('Rencency as min_Rencency')
        .orderBy('Monetary','desc')
        .map(function(row) {
            return ({
                max_Monetary:row.max_Monetary,
                min_Monetary:row.min_Monetary,
                max_Frequency:row.max_Frequency,
                min_Frequency:row.min_Frequency,
                max_Rencency:row.max_Rencency,
                min_Rencency:row.min_Rencency

            });
        })
        .then(function(list1){
            M_split=Math.round((list1[0].max_Monetary-list1[0].min_Monetary)/2);
            R_split=Math.round((list1[0].max_Rencency-list1[0].min_Rencency)/2);
            F_split=Math.round((list1[0].max_Frequency-list1[0].min_Frequency)/2);
            M_Max=list1[0].max_Monetary;
            R_Max=list1[0].max_Rencency;
            F_Max=list1[0].max_Frequency;
            cb(null,list1,M_split,R_split,F_split,M_Max,R_Max,F_Max);
        })
        .catch(function(err) {
            // All the error can be checked in this piece of code
            console.log(err);
        })
};

module.exports = Customer_Order;
