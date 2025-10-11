// Importing modules
const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

const cors = require('cors');
app.use(cors()); // This enables CORS for all routes
app.use(express.json());

const authroutes = require('./routes/user/auth')
const blogroutes = require('./routes/user/blog')
const adminRoutes = require('./routes/admin/blogPermission')
const User = require("./models/user");
const blog = require("./models/blog");

app.use(authroutes);
app.use(blogroutes)
app.use(adminRoutes)
//Connecting to the database
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.b3d76sp.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });

app.listen(process.env.PORT || 8000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 8000}`);
});