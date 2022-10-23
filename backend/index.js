// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import authRoute from "./routes/auth.js";

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());
dotenv.config()
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(console.log("Connected to mogodb")).catch((err)=>console.log(err));

app.use('/api/auth',authRoute);

app.listen("3000",()=>{
    console.log("Serrver running...");
}) 