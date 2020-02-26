var express = require('express');
var router = express.Router();

var interacts = require('../database/model/interact') 

router.get("/get",(req, res) => {
    let {page=1, pageSize=10} = req.body;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    interacts.find().limit(pageSize).skip((page-1)*pageSize).then(data => {
        res.json({
            data: data,
            code: 200,
            msg: "success"
        })
    })
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;

    interacts.remove({_id: id}).then(data => {
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