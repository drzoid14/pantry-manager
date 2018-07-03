'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const pantryItemSchema = mongoose.Schema({
    ingredient: {
        name: String,
        amount: Number
    }
});

pantryItemSchema.virtual('ingredientAndAmount').get(function() {
    return `${this.ingredient.amount} ${this.ingredient.name}`.trim();   
});

pantryItemSchema.methods.serialize = function(){
    return{
        id: this._id,
        ingredient: this.ingredientAndAmount
    };
};

const PantryItem = mongoose.model(PantryItem, pantryItemSchema);

module.exports = {BlogPost};