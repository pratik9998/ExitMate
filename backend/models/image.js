const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imageSchema = new Schema(
    {
        image : {
            type : String
        }
    }
);
module.exports = mongoose.model("image",imageSchema);
