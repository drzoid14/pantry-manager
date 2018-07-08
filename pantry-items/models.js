'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const pantryItemSchema = mongoose.Schema({
    name: String,
    amount: Number,
    measure: String
});



pantryItemSchema.methods.serialize = function(){
    return{
        id: this._id,
        name: this.name,
        amount: this.amount,
        measure: this.measure
    };
};

const PantryItem = mongoose.model('pantryitem', pantryItemSchema);

module.exports = { PantryItem };