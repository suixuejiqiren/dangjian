var express = require('express');
var router = express.Router();

var interacts = require('../database/model/interact') 

//用户发一条帖子
router.post('/add',(req,res,next)=>{
    // console.log(req.session.user)

    let{message}=req.body;
    let userImg=req.session.user.img;
    let userName=req.session.user.name;
    let userId=req.session.user._id;
    interacts.create({message,userImg,userName,userId}).then(data => {
        res.json({
            data: data,
            code: 200,
            msg: "success"
        })
    }).catch(err =>{
        const error = new Error(err)
        next(err)
    })

    if(req.session.user){
        // console.log(req.session.user)
        score.create({type:3,score:0.5,typeName:"互动发帖",userId:req.session.user._id}).then(
            data=>{
                res.json({
                    data,
                    code: 200,
                    msg: "success"
                })
               
                return
            }
        )
    }

})



router.get("/get",(req, res,next) => {
    let {page=1, pageSize=10,id} = req.query;
    if(!id){
        interacts.find({isParent:0}).sort({_id:-1}).limit(pageSize).skip((page-1)*pageSize).then((err,data)=> {
            if(err){
                res.json({
                    data: err,
                    code: 500,
                    msg: "false"
                })
                return
            }
            res.json({
                data: data,
                code: 200,
                msg: "success"
            })
            
  
        })
   
    }
    else{
        interacts.findOne({_id:id}).then(data=>{
            res.json({
                data: data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
    }

})

//回复一条帖子
router.post("/reply",(req,res,next)=>{
    let{parentId,toUserId,message}=req.body;
    let userImg=req.session.user.img;
    let userName=req.session.user.name;
    let userId=req.session.user._id;
    // console.log(req.body)

    interacts.findOne({$or:[{_id:parentId,userId:toUserId},{parentId,userId:toUserId}]}).then(dt=>{
        if(dt==null){
            res.json({
                data:"非法参数",
                code:400,
                msg:"非法参数"
            })
        }
        else{
            // console.log(dt.userImg)
        interacts.create({isParent:1,
            parentId,
            toUserId,
            toUserName:dt.userName,
            toUserImg:dt.userImg,
            message,
            userImg,
            userName,
            userId},(err,data)=>{
                if(err){
                    res.json({
                        data:err,
                        code:400,
                        msg:"帖子回复失败"
                    })
                    return
                }
                res.json({
                    data:"success",
                    code:200,
                    msg:"帖子回复成功"
                })
            })
        }
    })

})


//获取帖子回复
router.get("/getReply",(req,res,next)=>{
    let{parentId,pageSize=10,page=1}=req.query;
    interacts.find({parentId})
        .limit(pageSize).skip((page-1)*pageSize).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
        })
})
module.exports=router