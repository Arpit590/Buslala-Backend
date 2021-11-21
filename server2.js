const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router=require('express').Router();
const { verify } = require('crypto');
const cookieParser = require("cookie-parser");


dotenv.config({ path: "./config/config.env" });


const userrouter=require('./Routers/userRouter')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



connectDB();

app.use('/api/user',userrouter);

let PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(
    `Server Started on PORT ${PORT} `
  );
});