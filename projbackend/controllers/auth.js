//route-file name is same as controller-file
const User = require("../models/user")      //recommmnd to name the variable after what u throw in user.js end
const { check, validationResult } = require("express-validator"); //from express validation documentation

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
    const {email, password} = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
                error: errors.array()[0].msg
            })
    }
    User.findone({email},(err, user) => {
        if(err){
            res.status(400).json({
                error: "User email doesn't exists"
            })
        }

        
    })
}



exports.signout = (req, res) =>{           //use /api/signout
    res.json({                          //sending json response
        message: "User Signout! "
    })
    //res.send("user signout success!")  not using this
}
