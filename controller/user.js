var express = require('express');
var router = express.Router();
var users = require('../database/model/user')

router.post('/add',(req,res)=>{
    let{idNum,pwd,name,sex,img,nation,iscanLogin,branchName,branchId,typeName}=req.body
    users.create({idNum,pwd,name,sex,img,nation,iscanLogin,branchName,branchId,typeName},(err,backData)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                msg:"用户添加失败",
                ret:false
            })
            return
        }
        res.json({
            data:'success',
            code:200,
            msg:"用户添加成功",
            ret:true
        })
    })
})

router.get('/get',(req,res)=>{
    let{id,pn=1,species}=req.query
    if(!id){
        users.find(species).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data)=>{
            if(err){
                res.json({
                    data:err,
                    code:500,
                    msg:'false',
                    ret:false
                })
                return
            }
           res.json({
            data,
            code:200,
            msg:'success',
            ret:true
           }) 
        })
    }
    else{
        users.find({_id:id}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
    }

    
    
})


router.post("/del", (req, res, next) => {
    const {id} = req.body;

    users.remove({_id: id}).then(data => {
        if(data.n > 0){
            res.json({
                data: "success",
                code: 200,
                msg: "删除成功"
            })
        }
        else {
            res.json({
                data: "不存在的id",
                code: 200,
                msg: "不存在的id"
            })
        }
    }).catch(err => {
        new Error(err);
        next(err)
    })
})



router.post("/updateAll",(req,res) =>{//管理员批量重置密码
    let{users}=req.body;

    users.update({_id:{$in:users}},{$set:{pwd:"123456"}},
    {multi:true}).then(data=>{
        if(data.n==users.length){
            res.json({
                data:"success",
                code:200,
                msg:"success"
            })
            return
        }
        else{
            res.json({
                data:"false",
                code:"500",
                msg:"false"
            })
        }
    })

})

module.exports= router