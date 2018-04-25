var express = require('express');
var router = express.Router();
var session = require('express-session')
var users = require('../database/model/user')
var score = require('../database/model/score')



router.post('/login', (req, res,next) => {
    let { idNum, pwd } = req.body;
    if (!idNum) {
        res.json({
            data: "请输入身份证号码",
            code: 400,
            msg: "请输入身份证号码",
            ret: false
        })
        return
    }
    else if (!pwd) {
        res.json({
            data: "请输入密码",
            code: 400,
            msg: "请输入密码",
            ret: false
        })
        return
    }
    else {
        //登录验证部分
        users.findOne({ idNum }, (err, data) => {
            if (err) {
                res.json({
                    data: err,
                    code: 500,
                    msg: "登陆失败，稍后重试",
                    ret: false
                })
                return
            }
            if (data == null) {
                res.json({
                    data: "身份证号码不存在",
                    code: 400,
                    msg: "身份证号码不存在",
                    ret: false
                })
                return
            }
            else if (data.pwd != pwd) {
                res.json({
                    data: '密码不正确',
                    code: 400,
                    msg: '密码不正确',
                    ret: false
                })
                return
            }
            else if (data.pwd == pwd) {
                req.session.user = data;
                res.json({
                    data: '登录成功',
                    code: 200,
                    msg: '登录成功',
                    ret: true
                })
                
            }
            score.create({type:1,score:5,typeName:"登录",userId:req.session.user._id}).then(
                data=>{
                   
                    res.json({
                        data,
                        code: 200,
                        msg: "success"
                    })
                }
            )
        })
    }
})

module.exports = router;