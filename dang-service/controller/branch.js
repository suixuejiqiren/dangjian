var express = require('express');
var router = express.Router();
var branch = require('../database/model/branch')

router.post('/add',(req,res)=>{
    let {branchName}=req.body
    branch.create({branchName},(err,backData)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                msg:"插入失败",
                ret:false
            })
            return
        }
        res.json({
            data:'success',
            code:200,
            msg:"插入成功",
            ret:true
        })
    })
})

router.get('/get',(req,res)=>{
    let{id,pn=1}=req.query
    let params={}
    if(!id){
        //这是没有传ID的路线
        params = {}
    }
    else{
        params._id=id
    }
    branch.find(params).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                mag:'false',
                ret:false
            })
            return

        }
        res.json({
            data,
            code:200,
            mag:'success',
            ret:true
        })
    })

})



router.post("/del", (req, res, next) => {
    const {id} = req.body;

    imgs.remove({_id: id}).then(data => {
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