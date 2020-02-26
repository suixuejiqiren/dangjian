var mongoose = require('mongoose');

var scoreSchema =new mongoose.Schema({
  type:{
    type:Number
  },
  score:{
    type:Number
  },
  userId:{
    type:String
  },
  typeName:{
  type:String
}
  },{versionKey:false,timestamps:{createdAt:"createTime",updatedAt:"updateTime"}});

  module.exports = mongoose.model("score",scoreSchema,"score")