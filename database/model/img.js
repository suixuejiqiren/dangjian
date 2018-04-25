var mongoose = require('mongoose');
var imgSchema =new mongoose.Schema({

    img:{type:String},

    title:{type:String}
},{versionKey:false})


module.exports=mongoose.model("imgs",imgSchema,"imgs")