// Importing modules
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const cors = require('cors');
app.use(cors()); // This enables CORS for all routes

const authroutes=require('./routes/auth')
const User = require("./models/user");



app.use(express.json());

app.use(authroutes);

//Connecting to the database
mongoose
    .connect("mongodb+srv://vishalgaurav985_db_user:vishal985@cluster0.b3d76sp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen("8000",
            () => {
                console.log("Server is listening on port 8000");
            });
    })
    .catch(
        (err) => {
            console.log("Error Occurred");
        }
    );