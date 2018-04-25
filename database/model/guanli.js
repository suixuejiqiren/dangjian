var mongoose =require('mongoose');
var guanliSchema =new mongoose.Schema({
    name:{
        type:String
    },
    pwd:{
        type:String
    }
},{versionKey:false})

module.exports=mongoose.model("guanlis",guanliSchema,"guanlis")