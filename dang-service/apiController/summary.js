var express = require('express');
var router = express.Router();
var summary = require('../database/model/summary');
var score = require('../database/model/score')

router.post('/add', (req, res) => {
    let { img, discussId} = req.body;
    let userId = req.session.user._id;
    
    summary.findOne({ discussId, userId }).then(dt => {
        if (dt == null) {

            summary.create({ img, discussId, userId,common:[] }, (err, backData) => {
                if (err) {
                    res.json({
                        data: err,
                        code: 500,
                        msg: "上传失败",
                        ret: false
                    })
                    return
                }
                res.json({
                    data: 'success',
                    code: 200,
                    msg: "上传成功",
                    ret: true
                })
                if (req.session.user) {
                    score.create({ type: 3, score: 5, typeName: "上交总结", userId: req.session.user._id }).then(
                        data => {
                            console.log(data)
                            res.json({
                                data,
                                code: 200,
                                msg: "success"
                            })
                        }
                    )
                }
            })
        }

        else {
            res.json({
                data: "不能重复提交个人总结！",
                code: 400,
                msg: "不能重复提交个人总结！"
            })
        }
    })


})


//用户获取他人的个人总结（评议）
router.get("/getOne",(req,res,next)=>{
    let{discussId,userId}=req.query;

    summary.findOne({discussId,userId,status:1}).then(data=>{
        if(data==null){
            res.json({
                data:null,
                code:200,
                msg:"该用户未完善个人总结"
            })
        }
        else{
            res.json({
                data,
                code:200,
                msg:"sucess"
            })
        }
 
    })
})


//添加评议
router.post("/addCommon",(req,res,next)=>{
    let{id,content}=req.body
    let userId = req.session.user._id
    
    // summary.find({_id:id}, {common:{$elemMatch: {userId}} } ).then(dt=>{
    summary.find({_id:id, "common.userId": userId} ).then(dt=>{
        if(dt.length == 0){
            summary.update({_id:id},{$push:{common:{userId,content}}})
            .then((err,data)=>{
                if(err){
                    res.json({
                        data:err,
                        code:400,
                        msg:"false"
                    })
                    return
                }
                res.json({
                    data:"评论插入成功",
                    code:200,
                    msg:"评论插入成功"
                })
            })
        }
        else{
            res.json({
                data:"每个用户只可评论一次",
                code:400,
                msg:"每个用户只可评论一次"
            })
        }
    }).catch(err => {
        console.log(err)
    })
})


module.exports = router;