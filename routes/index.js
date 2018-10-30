'use strict';
var express=require('express');
var router=express.Router();
var User=require("../models/users");
var passport=require("passport");
var middleware=require("../middleware/index.js");

router.get('/register', function(req, res) {
    res.render("register");
});

router.post('/register',function(req, res) {
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err)
        {
            req.flash("error",err.message);            
            return res.redirect("/register");
        }
        passport.authenticate("Local")(req,res,()=>{
            user.email=req.body.email;
            user.save();
            req.flash("success","Welcome to Gotemps " +user.username);            
             res.redirect("/templates");
            // res.send("Registration Successfull");
        });
    });    
});

router.get("/login",(req,res)=>{
    res.render("templates/login",{message:req.flash("error")});
});

router.post('/login',passport.authenticate("local",{
    successRedirect:"/templates",
    failureRedirect:"/templates"
}),setMessage,function(req, res) {
    // if(!req.user)
    // {
    // req.flash("error","Invalid Username or Password");
    // res.render("templates/index");
    // }
    // else{
    
    // req.flash("success","Logged In");
    //     res.redirect("/templates");
    // }
});


router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success","Logged Out!!");
    res.redirect("/templates");
});

function setMessage(req,res,next){
    if(!req.user)
    req.flash("error","Invalid Username or Password");
    else
    req.flash("success","Welcome");
    next();
}


module.exports=router;