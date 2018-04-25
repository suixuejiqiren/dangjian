var express = require('express');
var router = express.Router();
var summary = require('../database/model/summary')


router.get("/get",(req, res,next) => {
    let {discussId,page=1,pageSize=10,id} = req.body;
    let params=discussId;
    if(id){
        summary.findOne({_id:id}).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
            return
        })
    }
        else{
            summary.find(params).limit(pageSize).skip((page-1)*pageSize).then(data => {
                res.json({
                    data: data,
                    code: 200,
                    msg: "success"
                })
            })
        }

})

//管理员审核个人总结
router.post("/update", (req, res, next) => {
    let {id,status} = req.body;

    summary.update({_id: id},{$set:{status}}).then(data => {
            res.json({
                data: "success",
                code: 200,
                msg: "审核完毕"
            })
    }).catch(err => {
        new Error(err);
        next(err)
    })
})


module.exports= router