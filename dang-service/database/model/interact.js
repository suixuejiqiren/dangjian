var mongoose =require('mongoose');

const newsInteract = new mongoose.Schema({
    isParent:{
        type:Number,
        default:0,
        index:true
    },
    parentId:{
        type:String,
        default:0
    },
    userId:{
        type:String
    },
    message: {
        type: String
    },
    userName:{
        type: String,
    },
    userImg:{
        type: String,
    },
    toUserId:{
        type:String
    }, 
    toUserName:{
        type: String,
    },
    toUserImg:{
        type: String,
    },

}, {versionKey: false, timestamps: {createAt: "createTime",updateAt: "updateTime"}})

module.exports = mongoose.model("interacts", newsInteract,"interacts")