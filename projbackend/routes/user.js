const express = require("express")
const router = express.Router()

const {getUserById, getUser} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");

router.param("UserId", getUserById);
router.get("/user/:userId", getUser);

module.exports = router;