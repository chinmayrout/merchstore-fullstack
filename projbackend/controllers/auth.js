//route-file name is same as controller-file

exports.signup = (req, res) =>{
    res.json({
        message: "Signup route works"
    })
}

exports.signout = (req, res) =>{           //use /api/signout
    res.json({                          //sending json response
        message: "User Signout! "
    })
    //res.send("user signout success!")  not using this
}
