/*jshint esversion: 6 */
var express = require('express');
var passport=require("passport");  
var LocalStrategy=require("passport-local");  
var session=require('express-session');
var methodOverride=require('method-override');
var flash=require("connect-flash");
require('dotenv').config();

// Models
var Template=require("./models/templates");
var Comment=require("./models/comments");
var User=require("./models/users");

// Routers

var templateRouter=require("./routes/templates");
var commentRouter=require("./routes/comments");
var indexRouter=require("./routes/index");


// Config

var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/gotemps');
// mongoose.connect('mongodb://'+process.env.user+':'+process.env.password+'@ds161446.mlab.com:61446/gotemps');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"I am awesome like a boss"
}));


passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

app.use(function(req, res, next) {
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});

// Routes


app.use("/",indexRouter); 
app.get("/", function (req, res) {
    Template.find({}, function (err, templates) {
        if (err) { console.log(err); }
        else {
            res.render("templates/index", { templates: templates });
        }
    });
});
app.use("/templates",templateRouter);
app.use("/templates/:id/comments",commentRouter);


app.listen(process.env.PORT ||3000, function () {
    console.log('Server listening on port 3000!');
});