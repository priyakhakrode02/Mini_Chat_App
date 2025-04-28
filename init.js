const mongoose = require ("mongoose");
const Chat = require('./models/chats.js');


main ()
    .then (() => {
        console.log("connection successful!");
    }) 
    .catch ( err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

let chats = [
    {
        from: "bubbu",
        to: "duddu",
        msg: "i am sorry duddu",
        created_at: new Date()
    },
    {
        from: "adam",
        to: "peter",
        msg: "send me your assignments please.",
        created_at: new Date()
    },

    {   
        from: "Ehan",
        to: "Rajvee",
        msg: "hello rajvee, please send me the notes.",
        created_at: new Date()

    }
]


Chat.insertMany (chats);

