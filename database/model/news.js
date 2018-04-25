var mongoose = require('mongoose');
var newSchema =new mongoose.Schema({
    content:{type:String},
    img:{type:String},
    number:{
      type:Number,
      default:0
  },
    contentText:{type:String},
    title:{type:String},
    type:{type:String},
   updateTime:{ 
        type:Date,
        default: Date.now()
    }
  },{versionKey:false});

  module.exports = mongoose.model("news",newSchema,"news")