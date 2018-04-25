var express = require('express');
var router = express.Router();
var session = require('express-session')
var guanlis = require('../database/model/guanli') 


router.post('/login',(req,res)=>{
    let{name,pwd}=req.body;
    guanlis.findOne({ name }, (err, data) => {
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
                data: "用户名不存在",
                code: 400,
                msg: "用户名不存在",
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
    })
})
    


module.exports=router