'use strict';
var express = require('express');

var router = express.Router();

var Template = require("../models/templates");

var middleware = require("../middleware/index.js");  


router.get("/", function (req, res) {
    Template.find({}, function (err, templates) {
        if (err) { console.log(err); }
        else {
            res.render("templates/index", { templates: templates });
        }
    });

});



// Change this route
// router.post('/', middleware.isLoggedIn, function (req, res) {
    router.post('/', function (req, res) {

        // Change the form
    Template.create(req.body.template, function (err, template) {
        if (err) { console.log(err); }
        else {
            // template.author.id = req.user._id;
            // template.author.username = req.user.username;
            // template.save();
            res.redirect("/templates");
        }
    });

});

// router.get('/new', middleware.isLoggedIn, function (req, res) {
router.get('/new',function (req, res) {
    res.render("templates/new.ejs");
});


router.get('/:id', function (req, res) {
    var id = req.params.id;
    Template.findById(id).populate("comments").exec(function (err, template) {
        if (err) { console.log(err); }
        else {
            res.render("templates/show", { template: template });
        }
    });

});

//EDIT CAMPGROUND
// router.get('/:id/edit', middleware.checkTemplateOwnership, function (req, res) {
router.get('/:id/edit', function (req, res) {
    Template.findById(req.params.id, (err, template) => {
        if (err) { console.log(err); }
        else {
            res.render("templates/edit", { template: template });
        }
    });
});


//UPDATE CAMPGROUND
// router.put('/:id', middleware.checkTemplateOwnership, function (req, res) {
router.put('/:id',function (req, res) {

    Template.findByIdAndUpdate(req.params.id, req.body.template, (err, template) => {
        if (err) {
            res.redirect("/templates");
        }
        else {
            res.redirect("/templates/" + req.params.id);
        }
    });
});


// router.delete('/:id', middleware.checkTemplateOwnership, function (req, res) {
router.delete('/:id', function (req, res) {
    Template.findByIdAndRemove(req.params.id, (err) => {
        if (err) { res.redirect("/templates"); }
        else {
            res.redirect("/templates");
        }
    });
});

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }

// function checkTemplateOwnership(req, res, next) {
//     if (req.isAuthenticated()) {
//         Template.findById(req.params.id, (err, template) => {
//             if (err) {res.redirect("back");}
//             else
//             { 
//             if (template.author.id.equals(req.user._id)) 
//             {
//                 return next();
//             }
//             else { res.redirect("back"); }
//         }
//         });
//     }
//     else
//     {
//         res.redirect("/login");
//     }
// }


module.exports = router;