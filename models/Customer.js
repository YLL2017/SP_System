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
Customer.getAll_RFM = function(req,cb) {
    db.select('*')
        .from('Customer')
        .innerJoin('RFM',function () {
            this.on('Customer.RFM_Score','=','RFM.RFM_Score')
        }).as('Customer_RFM')
        .map(function(row) {
            return ({
                Customer_ID : row.Customer_ID,
                Name : row.Name,
                Email : row.Email,
                Phone : row.Phone,
                Rencency:row.Rencency,
                Monetary:row.Monetary,
                Frequency:row.Frequency,
                RFM_Score:row.RFM_Score,
                BEI:row.BEI
            });
        })
        .then(function(C_RFM) {
                // console.log(Products[0]);
                cb(null, C_RFM);
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
Customer.get=function(cb) {
    var cost=1;
    var benefit=30;
    var BE=cost/benefit;
    db.select('*')
        .from('RFM')
        .map(function(row) {
            return ({
                RFM_Score : row.RFM_Score,
                Response_Rate : row. Response_Rate,
                BEI : (row.Response_Rate-BE)/row.Response_Rate,

            });
        })
        .then(function(RFM) {

            // console.log(Products[0]);
            cb(null, RFM);

    })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });


}


module.exports = Customer;