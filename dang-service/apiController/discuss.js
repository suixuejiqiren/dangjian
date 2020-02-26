var express = require('express');
var router = express.Router();
var discuss = require('../database/model/discuss')


router.get('/get',(rq,res,next)=>{
    discuss.findOne({status:1}).then(data=>{
        if(data==null){
            res.json({
                data:null,
                code:200,
                msg:"当前无民主评议"
            })
            return
        }
        res.json({
            data,
            code:200,
            msg:"success"
        })

    })
})

module.exports=router