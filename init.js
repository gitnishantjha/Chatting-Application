const mongoose = require('mongoose');//mongoose connection setup
const Chat=require("./models/chat.js");//taking the data from chat.js from models directory.
main().then(()=>{
    console.log("mongoose conn sussesful ")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
let allchats=[{
    from:"neha",
    to:"priya",
    msg:"send me notes",
    created_at:  new Date()//this date class send a random date 
},
{
    from:"pampi",
    to:"mayank",
    msg:"come to class",
    created_at: new Date()
},
{
    from:"nj",
    to:"amith",
    msg:"send me food",
    created_at: new Date()
}
];
Chat.insertMany(allchats);