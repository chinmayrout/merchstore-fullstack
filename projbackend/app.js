require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express"); //require express as well for listening
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./routes/auth.js")   // ./ means home directory

//DB Connection
mongoose.connect(
  process.env.DATABASE, //can use online database from atlas or anything
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } //to keep database alive 
).then(() => {          //then - catch is somewhat like trycatch
    console.log("DB Connected!");
}).catch(()=>{
    console.log("DB not Connected!");
})

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json())   //check here
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes)   //Mounts the specified middleware function or functions at the specified path:


//Ports
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
  console.log(`App is Running at ${port}`); //used backticks  `
});  
