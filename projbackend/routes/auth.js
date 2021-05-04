var express = require('express')
var router = express.Router()   //using express router; get from express routing documentation
const {signout, signup} = require("../controllers/auth")    //{} contains method of the many methods; ../ means going back from the current directory to parent



router.post("/signup", signup)
router.get("/signout", signout)

module.exports = router