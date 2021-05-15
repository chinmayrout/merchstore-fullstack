var express = require("express");
var router = express.Router(); //using express router; get from express routing documentation
const { signout, signup, signin, isSignedIn } = require("../controllers/auth"); //{} contains method of the many methods; ../ means going back from the current directory to parent
const { check, validationResult } = require("express-validator"); //from express validation documentation

router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 char").isLength({ min: 3 }), //express validation
    check("email", "email is required").isEmail(), //signup validation
    check("password", "Password should be atleast 3 char").isLength({ min: 3 }),
  ],
  signup
); //for post request use postman

router.post(
  "/signin",
  [
    //post call because taking input from the user

    check("email", "email is required").isEmail(),
    check("password", "Password field is required").isLength({ min: 1 }),
  ],
  signin //for post request use postman and don't forget to include signin from controller to routes
);

router.get("/signout", signout);

// router.get("/testroute", isSignedIn, (req, res) => {    //next not required in this middleware as using expressJwt
//     res.json(req.auth);
// })

module.exports = router;
