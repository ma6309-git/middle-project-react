const mongoose = require("mongoose")
const todosSchema = new mongoose.Schema({
    title:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    tags:{

    },
    completed:{
        
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Todos',todosSchema )