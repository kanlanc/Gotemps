// //All the middle ware functions
// var Template=require("./models/templates");
// var Comment=require("./models/comments");
// var User=require("./models/users");

var middleware={};

// middleware.isLoggedIn=function(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error","Please Login First!!");
//     res.redirect("/login");
// };

// middleware.checkCampgroundOwnership=function(req, res, next) {
//     if (req.isAuthenticated()) {
//         Campground.findById(req.params.id, (err, campground) => {
//             if (err)
//              {
//                 req.flash("error","Campground not found!!");
//                  res.redirect("back");
//                 }
//             else
//             { 
//             if (campground.author.id.equals(req.user._id)) 
//             {
//                 return next();
//             }
//             else 
//             {
//                 req.flash("error","You do not have the permission to do that!!");
//                 res.redirect("back"); 
//             }
//         }
//         });
//     }
//     else
//     {
//         req.flash("error","You need to be logged in to do that!!");
//         res.redirect("/login");
//     }
// };


// middleware.commentOwnership=function(req,res,next){
 
//         if(req.isAuthenticated())
//         {
//             Comment.findById(req.params.comment_id,(err,comment)=>{
//                 if(comment.author.id.equals(req.user._id))
//                 {
//                     return next();
//                 }  
//                 else
//                 {
//                     req.flash("error","You need permission to do that!!");                    
//                     res.redirect("back");
//                 }
//             });
//         }
//         else
//         {
//             req.flash("error","You need to be logged in to do that!!");            
//             res.redirect("/login");
//         }
//     };
    



module.exports=middleware;