var mongoose = require('mongoose');

var branch =new mongoose.Schema({
  branchName:{
  type:String
}
  },{versionKey:false,timestamps:{createdAt:"createTime",updatedAt:"updateTime"}});

  module.exports = mongoose.model("branch",branch)