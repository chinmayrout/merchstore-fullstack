const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
  return res.send("Home Page!");
});

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
