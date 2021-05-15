//route-file name is same as controller-file
const User = require("../models/user.js")      //recommmnd to name the variable after what u throw in user.js end
const { check, validationResult } = require("express-validator"); //from express validation documentation
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){  //errors not error
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const user = new User(req.body)
    user.save((err, user) => {      //using mongoose 
        if(err){
            return res.status(400).json({
                err: "NOT Able to save user in DB"
            })
        }
        res.json({  //adding to the database
            name: user.name,    //adding name
            email: user.email,     //adding email
            id: user._id    //adding id
        })
    })

    // console.log("REQ BODY", req.body)        //not required
    // res.json({
    //     message: "Signup route works"
    // })
}

exports.signin = (req, res) =>{
    const errors = validationResult(req)
    const {email, password} = req.body; //destructuring

    if(!errors.isEmpty()){
        return res.status(422).json({
                error: errors.array()[0].msg
            })
    }
    User.findOne({email},(err, user) => {   //findone is mongoose method
        if(err || !user){   //or adding USER doesn't exist
            return res.status(400).json({
                error: "User email doesn't exists"
            })
        }

        if(!user.authenticate(password)){   //from User
            res.status(401).json({
                error: "Email and Password do not match"
            })
        }
        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999})

        //send response to front-end
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}})

        
    })
}



exports.signout = (req, res) =>{           //use /api/signout
    res.clearCookie("token");   //clear cookie which is token
    res.json({                          //sending json response
        message: "User Signout Successfully! "
    })
    //res.send("user signout success!")  not using this
}


//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});


//custom middlewates
exports.isAuthenticated = (req, res, next) =>{
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;  //to check front end && top middleware && profile_id === auth_id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"  //if anything is not true; acess id denied
        })
    }
    next()
}

exports.isAdmin = (req, res, next) =>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not ADMIN! Access Denied!"
        });
    }
    next()  //super importatn in middleware
}