const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    },
    availaibility:{
        type:String,
        required:true
    },
    qualifications:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    phNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    price:{
        type:String,
    },
    location:{
        type:String
    },
    rating:{
        type:String
    },
    incomingReq:{
        type:String,
       
    },
    outgoingReq:{
        type:String,
    }


});

const guide = mongoose.model('guide', ReactFormDataSchema);
module.exports = guide;