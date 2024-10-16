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
    }
})
const exp = mongoose.model("outToken",outToken);
module.exports = exp;