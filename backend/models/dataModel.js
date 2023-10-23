const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    reporter : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    title : {
        type : String,
        required : true,
        unique : true,
    },
    type : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    file : {
        type : String,
        required : true,
    },
    news :{
        type : String,
        required : true,
    },
    braking : {
        type : String,
        required : true,
    },
},
    {timestamps : true}
);

module.exports = mongoose.model('NewsData',dataSchema);