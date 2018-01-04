var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Material = function(options) {
    this.Material_ID=options.Material_ID;
    this.Name = options.Name;
    this.Unit = options.Unit;
    this.Price=options.Price;
    this.Stock=options.Stock;
    this.Alert_Value=options.Alert_Value;

};
Material.getAll = function(cb) {
    db.select('*')
        .from('Material')
        //當天跟1/1差的天數
        .select(db.raw('DATEDIFF(CURDATE(),?) as ?',['2017-12-27','days']))
        .map(function(row) {
            return ({
                Material_ID : row.Material_ID,
                Name : row.Name,
                Unit : row.Unit,
                Price : row.Price,
                Stock:row.Stock,
                Alert_Value:row.Alert_Value,
                days:row.days,

            });
        })
        .then(function(Materials) {
            if(Materials.length) {
                // console.log(Products[0]);
                cb(null, Materials);
            } else {
                cb(null, new GeneralErrors.NotFound());
            }

        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
}
Material.prototype.save = function (cb) {
    if (this.Material_ID) {
        //已存在
        db("Material")
            .where({
                Material_ID : this.Material_ID
            })
            .update({
                Name : this.Name,
                Unit : this.Unit,
                Price:this.Price,
                Stock:this.Stock,
                Alert_Value:this.Alert_Value
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



module.exports = Material;