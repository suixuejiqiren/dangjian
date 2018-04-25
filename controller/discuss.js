var express = require('express');
var router = express.Router();
var discuss = require('../database/model/discuss')

router.post("/add",(req,res,next)=>{
    let{title,content}=req.body;
    discuss.create({title,content}).then(data=>{
        res.json({
            data:"success",
            code:200,
            msg:"民主评议创建成功"
        })
    }).catch(err=>{
        next(new Error(err))
    })

})

//
router.post("/update",(req,res,next)=>{
    let{status,id}=req.body;

    if(status==1){
        discuss.findOne({status:1}).then(dt=>{
            if(dt==null){
                discuss.update({_id:id},{$set:{status}}).then(data=>{
                    res.json({
                        data:"success",
                        code:200,
                        msg:"开启成功"
                    })
                })
            }
            else{
                res.json({
                    data:"当前已经有一个已经开启的评议",
                    code:200,
                    msg:"当前已经有一个已经开启的评议"
                })
            }
        })
    }
    else{
            discuss.update({_id:id},{$set:{status}}).then(data=>{
                res.json({
                    data:"success",
                    code:200,
                    msg:"关闭成功"
                })
            })
    }


})



router.get('/get',(req,res)=>{
    let{status,pn=1}=req.query
    let params={}
    if(!status){
        //这是没有传ID的路线
        params = {}
    }
    else{
        params.status=status
    }
    discuss.find(params).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data)=>{
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
module.exports=router;