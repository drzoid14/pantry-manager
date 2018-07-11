'use strict';

const bycrypt=require('bycrypt');
const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    firstName: {type: String, default: ''}
});

UserSchema.methods.serialize=function() {
    username=this.username,
    firstName=this.firstName
}

UserSchema.methods.validatePassword=function(password) {
    return bycrypt.compare(password,this.password);
}

UserSchema.methods.hashPassword=function(password){
    return bycrypt.hash(password,10);
}

const User = mongoose.model('User',UserSchema);

module.exports = {User};