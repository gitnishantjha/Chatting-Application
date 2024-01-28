const express=require("express"); //express connection setup
const app=express();
const mongoose = require('mongoose');//mongoose connection setup
const path=require("path");//ejs connection setup
const Chat=require("./models/chat.js");//taking the data from chat.js from models directory.
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));// watever we get the data from some form in any req body we have to parse it so we use this line to parse the following data.
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("mongoose conn sussesful ")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//index route
app.get("/chats",async(req,res)=>{
let chats=await Chat.find();
// console.log(chats);
res.render("index.ejs",{chats});
});


//new chats route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs",{});
});




//crete chat route
app.post("/chats",(req,res)=>{
   let{from,to,msg}=req.body;
   let newChat= new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
   });
   newChat.save().then((res)=>{
    console.log("chat was saved");
}).catch((err)=>{
    console.log(err);
});
res.redirect("/chats");
});


//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//update route
app.put("/chats/:id",async(req,res)=>{
   let{id}=req.params;
   let{msg:newMsg}=req.body;
   let updatedChat= await Chat.findByIdAndUpdate(
    id,
    {msg:newMsg},
    {runValidators:true,new:true}
   );
   console.log(updatedChat);
   res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id",async (req,res)=>{
let {id}=req.params;
let deletedChat=await Chat.findByIdAndDelete(id);
console.log(deletedChat);
res.redirect("/chats");
});


app.get("/",(req,res)=>{
    res.send('root is working');
});



app.listen(8080,()=>{
    console.log("server is listening to port");
});