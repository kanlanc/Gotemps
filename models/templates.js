var mongoose=require('mongoose');

var templateSchema=new mongoose.Schema({
    name:String,
    rating:String,
    preview:String,
    copy:String,
    category:String,
    dataFile:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
});

var Template=mongoose.model('Template', templateSchema);

module.exports=Template;