var express = require('express');
var router = express.Router();

var score = require('../database/model/score')

router.get("/get",(req, res,next) => {
    let {page=1, pageSize=10} = req.body
    let userId=req.session.user._id;
        score.find({userId:userId}).sort({_id:-1}).limit(pageSize).skip((page-1)*pageSize).then(data => {
            res.json({
                data: data,
                code: 200,
                msg: "success"
            })
        })
})

module.exports = router;