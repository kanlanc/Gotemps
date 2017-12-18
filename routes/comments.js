'use strict';

var express=require('express');

var router=express.Router({mergeParams:true});
var Template=require("../models/templates");
var Comment=require("../models/comments");

var middleware=require("../middleware/index.js");


router.get('/new',middleware.isLoggedIn,function (req, res) {
// router.get('/new',function (req, res) {
    Template.findById(req.params.id, function (err, template) {
        if (err)
            {console.log(err);}
        else {
            res.render("comments/new", { template: template });
        }
    });
});



router.post('/',middleware.isLoggedIn,function (req, res) {
// router.post('/',function (req, res) {
    Template.findById(req.params.id, function (err, template) {
        if (err) {
            console.log(err);
            res.redirect("/templates");
        }
        else {
            Comment.create(req.body.comment,function(err,comment){
                if (err) {
                    console.log(err);
                    req.flash("error","Something went wrong!!");
                    res.redirect("back");
                }
                else
                {
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    template.comments.push(comment);
                    template.save();
                    req.flash("success","Successfully added the comment!!");                    
                    res.redirect("/templates/"+template._id);
                }
            });
        }
    });

});

router.get('/:comment_id/edit',middleware.commentOwnership, function(req, res) {
// router.get('/:comment_id/edit',function(req, res) {
    Comment.findById(req.params.comment_id,function(err,comment){
        if(err)
        {res.redirect("back");}
        else
        {
            res.render("comments/edit",{template_id:req.params.id,comment:comment});
        }
    });
    
});

router.put("/:comment_id",middleware.commentOwnership,(req,res)=>{
// router.put("/:comment_id",(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,comment)=>{
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/templates/"+req.params.id);
        }
    });
});

router.delete('/:comment_id',middleware.commentOwnership, function(req, res) {
// router.delete('/:comment_id',function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err)
        {res.redirect("back");}
        else
        {
            req.flash("success","Successfully removed the comment!!");            
            res.redirect("/templates/"+req.params.id);
        }
    });
});





module.exports=router;