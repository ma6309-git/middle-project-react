const mongoose = require("mongoose")
const usersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userName:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Users',usersSchema )