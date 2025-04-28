
const express = require ("express");
const app = express();
const mongoose = require ('mongoose');
const path = require ('path');
const Chat = require('./models/chats.js');


app.set("view engine", "ejs");
app.set ("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

main ()
    .then (() => {
        console.log("connection successful!");
    }) 
    .catch ( err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

//index route

app.get("/chats",  async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats});
    
}) ;


app.get ("/", (req, res) => {
    res.send("root is working!!");
});

app.listen( 8080, () => {
    console.log("server is listening on port 8080");
});