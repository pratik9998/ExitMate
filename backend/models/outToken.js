const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const outToken = new Schema({
    outDate :{
        type : Date,
        required : true
    },
    inDate : {
        type : Date,
    },
    active : {
        type : Boolean,
        default : true 
    },
    outImage : {
        type : String
    },
    inImage : {
        type : String
    }
})
const exp = mongoose.model("outToken",outToken);
module.exports = exp;