//makiung the collection for the chats 
const mongoose = require('mongoose');//mongoose connection setup

const chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type:Date,
        required:true,
    },
});

const Chat =mongoose.model("chat",chatSchema);
module.exports=Chat;