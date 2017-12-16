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
            req.flash("success","Welcome to Gotemps " +user.username);            
             res.redirect("/templates");
            // res.send("Registration Successfull");
        });
    });    
});

router.get("/login",(req,res)=>{
    res.render("login",{message:req.flash("error")});
});

router.post('/login',passport.authenticate("local",{
    successRedirect:"/templates",
    failureRedirect:"/login"
}),function(req, res) {
    
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success","Logged Out!!");
    res.redirect("/templates");
});

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports=router;