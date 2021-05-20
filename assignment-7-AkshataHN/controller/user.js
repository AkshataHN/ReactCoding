const { response } = require('express');
const User = require('../model/user')

exports.signUp = (req ,res)=> {
    // const Reqbody = req.body
    const {
        email,
        password,
        firstName,
        lastName
    } = req.body

    const userObj  = new User(
        {
            email : email,
            password : password,
            firstName : firstName,
            lastName : lastName
        }
    );
    
    //call the save method

    userObj.save().then(result => {
        res.status(200).json({
            message: "User Registered Successfully",
            user: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error in Database",
            error: error
        });
    });
}

exports.login = (req ,res)=> {
    const {
        email: email,
        password: password
    } =req.body;

    User.find({
        email : email,
        password : password
    }).then(result =>{
        if(result.length > 0){
        res.status(200).json({
            message: "logged in successfully",
            user : result
        });
    }else{
        res.status(404).json({
            message : "email r password is incorrect"
        });
    }
    }).catch(error =>{
        res.status(500).json({
            message: "error in Database",
            error : error
        })
    });

}