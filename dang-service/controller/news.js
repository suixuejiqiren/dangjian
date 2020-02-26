var express = require('express');
var router = express.Router();
var news = require('../database/model/news')

router.post('/add',(req,res)=>{
    let{content,contentText,img,title,type,number}=req.body
    news.create({content,contentText,img,title,type,number},(err,backData)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                msg:"数据插入失败",
                ret:false
            })
            return
        }
        res.json({
            data:'success',
            code:200,
            msg:"数据插入成功",
            ret:true
        })
    })
})

router.get('/get',(req,res)=>{
    let{id,type}=req.query
    if(!id){
        news.find(type).sort({_id:-1}).exec((err,data)=>{
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
        news.find({_id:id}).then(data => {
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

router.post("/update",(req,res,next)=>{
    var {id,content,contentText,img,title,type,number}=req.body;

    news.update({_id:id},{$set:{content,contentText,img,title,type,number}}).then(data=>{
        res.json({
            data:"success",
            code:200,
            msg:"更新成功"
        })
    }).catch(err => {
        new Error(err)
        next(err)
    })
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;

    news.remove({_id: id}).then(data => {
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

module.exports=router;