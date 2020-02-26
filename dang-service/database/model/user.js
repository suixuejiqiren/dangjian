var mongoose =require('mongoose');

var userSchema = new mongoose.Schema({
    iscanLogin:{
        type:Boolean,
        default:true
    },

    pwd:{
        type: String
     },
     img:{
        type: String
     },
     name:{
        type: String
     },
     branchName:{
         type:String,
         default:"信息工程学院学生流动党支部（北京）"
        },
        branchId:{
            type:String,
            default:"5ad6aac9de3f2a0a48d58ee0"
        },
     sex:{
        type:Number,
        default:2
        },
    
    nation:{            //民族
        type:String
     },                     
     idNum:{
         type:String,
        require:true,
        unique:true,//唯一的
        index:true //增加索引，优化查询
     },
     typeName:{
        type:String,
        default:"党员"
    }
},
{versionKey:false}
)
module.exports = mongoose.model('users',userSchema,'users')