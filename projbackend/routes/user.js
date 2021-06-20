const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser /*,getAllUsers */} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("UserId", getUserById);
router.get("/user/:UserId", isSignedIn, isAuthenticated, getUser);  //read documentation
router.put("/user/:UserId", isSignedIn, isAuthenticated, updateUser);

// router.get("/users", getAllUsers)
module.exports = router;