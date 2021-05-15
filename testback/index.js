const express = require("express");

const app = express();

const port = 8000;

const home = (req, res) => {  //variable to send into / route
  return res.send("Home Dashboard!a");
};

const isHome = (req, res, next) => {    //check next - middleware
  console.log("isHome is running");
  next();
} 

const isLoggedIn = (req, res, next) => {
  console.log("isLogged?");
  next();
}

app.get("/", isLoggedIn, isHome, home);

app.get("/login", (req, res) => {
  return res.send("You are visiting Login Route!");
});

app.get("/signup", (req, res) => {
  return res.send("You are visiting sign-up Route");
});

app.get("/chinmay", (req, res) => {
  return res.send("thechinmayrout is my instagram!");
});

app.get("/logout", (req, res) => {
  return res.send("You have logged out!");
});

app.listen(port, () => {
  //listen on some port
  console.log("Server is up and running!");
});
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

//on terminal
//npm init
//name should be index.js
//to run node index.js
