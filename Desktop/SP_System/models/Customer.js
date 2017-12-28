var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Customer = function(options) {
    this.Customer_ID=options.Customer_ID;
    this.Name = options.Name;
    this.Email = options.Email;
    this.Phone=options.Phone;
    this.Rencency=options.Rencency;
    this.Monetary=options.Monetary;
    this.Frequency=options.Frequency;
    this.RFM_Score=options.RFM_Score;
};
Customer.getAll = function(cb) {
    db.select('*')
        .from('Customer')
        .map(function(row) {
            return ({
                Customer_ID : row.Customer_ID,
                Name : row.Name,
                Email : row.Email,
                Phone : row.Phone

            });
        })
        .then(function(Customers) {
            if(Customers.length) {
                // console.log(Products[0]);
                cb(null, Customers);
            } else {
                cb(null, new GeneralErrors.NotFound());
            }

        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
}

Customer.prototype.save = function (cb) {
    if (this.Customer_ID) {
        //已存在
        db("Customer")
            .where({
                Customer_ID : this.Customer_ID
            })
            .update({
                Rencency:this.Rencency,
                Frequency:this.Frequency,
                Monetary:this.Monetary,
                RFM_Score:this.RFM_Score
            })
            .then(function() {

                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("ORDER UPDATED", err);
                cb(new GeneralErrors.Database());
            });
    } else {

    }
};

module.exports = Customer;