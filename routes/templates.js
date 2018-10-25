"use strict";
var express = require("express");
var mongoose = require("mongoose");

// var gridfs = require('gridfs-stream');
var fs = require("fs");
var cloudinary = require("cloudinary").v2;

var multipart = require("connect-multiparty");
// var multipartMiddleware = multipart({ uploadDir: '../public/uploads' });
var multipartMiddleware = multipart();

cloudinary.config({
  cloud_name: "dervrvjbk",
  api_key: "566389721371345",
  api_secret: "V4IlNyKmhpWgBrY3URdSAVTt3qw"
});

var router = express.Router();

var Template = require("../models/templates");

var middleware = require("../middleware/index.js");

var uploads = {};

router.get("/", function(req, res) {
  Template.find({}, function(err, templates) {
    if (err) {
      console.log(err);
    } else {
      res.render("templates/index", { templates: templates });
    }
  });
});

router.post("/", middleware.isLoggedIn, multipartMiddleware, function(
  req,
  res
) {
  Template.create(req.body.template, function(err, template) {
    if (err) {
      console.log(err);
    } else {
      template.author.id = req.user._id;
      template.author.username = req.user.username;
      template.save();
      let filename = req.files.dataFile.path;

      cloudinary.uploader
        .upload(filename, { tags: "gotemps",resource_type: "auto" })
        .then(function(file) {
          
          console.log("Public id of the file is  " + file.public_id);
          console.log("Url of the file is  " + file.url);
          template.dataFile=file.url;
          template.save();
          res.redirect("/templates");
        })
        .catch(function(err) {
          
          if (err) {
            console.warn(err);
          }
        });

      res.redirect("/templates");
    }
  });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
  // router.get('/new',function (req, res) {
  res.render("templates/new.ejs");
});

router.get("/:id", function(req, res) {
  var id = req.params.id;
  Template.findById(id)
    .populate("comments")
    .exec(function(err, template) {
      if (err) {
        console.log(err);
      } else {
        res.render("templates/show", { template: template });
      }
    });
});

//EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkTemplateOwnership, function(req, res) {
  // router.get('/:id/edit', function (req, res) {
  Template.findById(req.params.id, (err, template) => {
    if (err) {
      console.log(err);
    } else {
      res.render("templates/edit", { template: template });
    }
  });
});

//UPDATE CAMPGROUND
router.put("/:id", middleware.checkTemplateOwnership, function(req, res) {
  // router.put('/:id',function (req, res) {

  Template.findByIdAndUpdate(
    req.params.id,
    req.body.template,
    (err, template) => {
      if (err) {
        res.redirect("/templates");
      } else {
        res.redirect("/templates/" + req.params.id);
      }
    }
  );
});

router.delete("/:id", middleware.checkTemplateOwnership, function(req, res) {
  // router.delete('/:id', function (req, res) {
  Template.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect("/templates");
    } else {
      res.redirect("/templates");
    }
  });
});

module.exports = router;
