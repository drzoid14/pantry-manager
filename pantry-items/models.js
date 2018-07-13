'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



const pantryItemSchema = mongoose.Schema({
    name: String,
    amount: Number,
    measure: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: false,
        required: [true, 'No User id found']
    
    }
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