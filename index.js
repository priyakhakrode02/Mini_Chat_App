
const express = require ("express");
const app = express();
const mongoose = require ('mongoose');
const path = require ('path');
const Chat = require('./models/chats.js');
const methodOverride = require('method-override');


app.set("view engine", "ejs");
app.set ("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

main ()
    .then (() => {
        console.log("connection successful!");
    }) 
    .catch ( err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

//actual chat delete.

app.delete("/chats/:id", async (req, res) => {
    console.log("Received DELETE request for:", req.params.id);
    
    let { id } = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat)
    res.redirect("/chats");

});


//delete page route  (when user click's delete button, user will be redirected to this route)

app.get("/chats/:id/delete", async (req, res) => {

    let {id} = req.params;
    let chat = await Chat.findById(id);

    res.render("delete.ejs", { chat });
});

// actual update route

app.put("/chats/:id", async (req, res) => {

    let {id} = req.params;
    let {newMessage: edited_msg } = req.body; //Destructuring assignment happens from right to left. It extracts newMessage from req.body and assigns it to edited_msg.(like this: edited_msg = req.body.newMessage;)
    console.log(edited_msg);
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: edited_msg}, {new: true}); //({new: true}: Return the updated(new) document instead of the old one.)
    console.log(updatedChat);
    res.redirect("/chats");

});


//edit page route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs", {chat});

});

//New Chat route
app.get("/chats/new", (req, res) => {
 
    res.render("new_chat.ejs");
});

//chat saved Route
app.post("/chats", (req, res) => {

    let {from, to, msg } = req.body;
    let newChat = new Chat ({

        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),

    });    
    //console.log(newChat);
    //res.send("working!!");
    newChat
    .save() 
    .then((res) => {
        console.log("new chat saved to db!");
    })
    .catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");

});

//index route

app.get("/chats",  async (req, res) => {
    let chats = await Chat.find();
    //console.log(chats);
    res.render("index.ejs", {chats});
    
}) ;


app.get ("/", (req, res) => {
    res.send("root is working!!");
});

app.listen( 8080, () => {
    console.log("server is listening on port 8080");
});