var express = require('express');
var router = express.Router();

var category = require('../database/model/category') 

router.post('/add',(req,res,next)=>{
    let{label,value}=req.body

    category.create({label, value}).then(data => {
        res.json({
            data: "分类插入成功",
            code: 200,
            msg: "success"
        })
    }).catch(err =>{
        const error = new Error(err)
        next(err)
    })
})


router.get("/get",(req, res) => {
    let {page=1, pageSize=10} = req.body;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    category.find().limit(pageSize).skip((page-1)*pageSize).then(data => {
        res.json({
            data: data,
            code: 200,
            msg: "success"
        })
    })
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;

    category.remove({_id: id}).then(data => {
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


module.exports=router