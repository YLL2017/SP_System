var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');
var Customer=require('../models/Customer');
var RFM=function(options) {
    this.RFM_Score=options.RFM_Score;
    this.Response_Rate = options.Response_Rate;
    this.BEI = options.BEI;

};
RFM.prototype.save = function (cb) {
    if (this.RFM_Score) {
        //已存在
        db("RFM")
            .where({
                RFM_Score : this.RFM_Score
            })
            .update({
                BEI:this.BEI
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

RFM.get=function(cb) {
    var cost=1;
    var benefit=30;
    var BE=(cost/benefit)*100;
    console.log(BE);

    db.select('*')
        .from('RFM')
        .map(function(row) {
            return ({
                RFM_Score : row.RFM_Score,
                Response_Rate : row. Response_Rate,
                BEI : (row.Response_Rate-BE)/row.Response_Rate*100,

            });
        })
        .then(function(RFM_list) {
            // console.log(Products[0]);
            cb(null, RFM_list);

        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });


}
module.exports = RFM;
