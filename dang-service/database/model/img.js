var mongoose = require('mongoose');
var imgSchema =new mongoose.Schema({

    img:{type:String},

    title:{type:String},
    url:{
        type:String
        //对应新闻的id  
    }
},{versionKey:false})


module.exports=mongoose.model("imgs",imgSchema,"imgs")