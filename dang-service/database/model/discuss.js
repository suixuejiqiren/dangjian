var mongoose = require('mongoose');

var discuss =new mongoose.Schema({
  title:{
  type:String,
  require:true
},
status:{
    type:Number,
    default:0
},
    content:{
        type:String,
        require:true
    }
  },{versionKey:false,});

  module.exports = mongoose.model("discuss",discuss)