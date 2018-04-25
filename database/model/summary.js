var mongoose =require('mongoose');
var summarySchema =new mongoose.Schema({
    
    img:{type:String,
    require:true},
    status:{
        type:Number,//0表示未审核，1表示审核通过，2表示审核未通过
        default:0
    },
    userId:{
        type:String,
        index:true
    },
    discussId:{
        type:String,
        index:true
    },
    common:[{
        userId:{ //评论人
            type:String
        },
        content:{ //评论内容 0优 1良 2中 3差
            type:Number,
            default:0
        }
    }]
},{versionKey:false})

module.exports=mongoose.model("summary",summarySchema,"summary")