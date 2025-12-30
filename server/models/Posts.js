const mongoose = require("mongoose")
const postsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Posts',postsSchema )