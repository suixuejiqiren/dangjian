var qiniu = require('qiniu');


  module.exports=function(){
    var accessKey = 'hiaSMM1QqBT-0Q0KywiDrpp_tXbgBz8p1mFXkoil';
var secretKey = 'A4to1dxJHlKuQ_HuoKWhdf34-J3B_dYzt4eIT5tl';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
    scope: "public",
    returnBody:  '{"key": $(key), "hash": $(etag), "url": "http://pbl.yaojunrong.com/$(key)"}',
    expires: 3600,
    deadline: Math.round(new Date().getTime()/1000)+3600,
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  return uploadToken
  }