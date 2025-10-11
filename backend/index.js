// Importing modules
const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

const cors = require('cors');
app.use(cors()); // This enables CORS for all routes
app.use(express.json());

const authroutes=require('./routes/user/auth')
const blogroutes=require('./routes/user/blog')
const adminRoutes=require('./routes/admin/blogPermission')
const User = require("./models/user");
const blog = require("./models/blog");

app.use(authroutes);
app.use(blogroutes)
app.use(adminRoutes)
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