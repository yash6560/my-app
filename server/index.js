const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const userroutes = require('./Routes/user.routes');
const notesroutes = require('./Routes/notes.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userroutes);
app.use('/api', notesroutes);

app.listen('8080', () => {
    console.log("server is running");
})

mongoose.connect('mongodb+srv://yashkumarp:Jboi83dPrWCWY5TQ@cluster0.uhfjp.mongodb.net/my-app?retryWrites=true&w=majority&appName=Cluster0')
.then(console.log("database is connected"));



