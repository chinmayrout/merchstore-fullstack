const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList /*,getAllUsers */,
} = require("../controllers/user"); //getting things from user controller
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("UserId", getUserById);

/*
whenever there is :, it will be interpreted as userId and this method will automatically populate a req.profile 
*/

router.get("/user/:UserId", isSignedIn, isAuthenticated, getUser); //read documentation
router.put("/user/:UserId", isSignedIn, isAuthenticated, updateUser); //updation of data - put request

router.put(
  "/orders/user/:UserId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

router.get(
  "/orders/user/:UserId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
); //updation of data

// router.get("/users", getAllUsers)
module.exports = router;
