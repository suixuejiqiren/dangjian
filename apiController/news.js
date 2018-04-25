var express = require('express');
var router = express.Router();
var news = require('../database/model/news');
var score=require('../database/model/score')


router.get('/get',(req,res)=>{
    let{id,type,pn=1}=req.query
    if(!id){
        news.find({type:type}).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data)=>{
            if(err){
                res.json({
                    data:err,
                    code:500,
                    msg:"false",
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
            // console.log(data[0].number+1)
            // let(number1)=data.number+1
            // console.log(data.number)
            news.update({_id:id},{$set:{number:data[0].number+1}}).then(data=>{
                res.json({
                    data:"success",
                    code:200,
                    msg:"更新成功"
                })
            })
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
        // news.update({_id:id},{$set:{number}}).then(data=>{
        //     res.json({
        //         data:"success",
        //         code:200,
        //         msg:"更新成功"
        //     })
        // }).catch(err => {
        //     new Error(err)
        //     next(err)
        // })

        if(req.session.user){
            // console.log(req.session.user)
            score.create({type:2,score:0.1,typeName:"查看新闻",userId:req.session.user._id}).then(
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


    }

})

module.exports=router;