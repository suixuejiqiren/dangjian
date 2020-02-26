var express = require('express');
var router = express.Router();
var users = require('../database/model/user')




router.get('/get',(req,res)=>{
    
    //    let{id}= req.session.user._id
    //    console.log(req.session.user._id)
        users.find({_id:req.session.user._id}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
    

    
    
})



router.get('/get/branch',(req,res)=>{
        //    let{id}= req.session.user._id
    //    console.log(req.session.user._id)
    let{branchId}=req.query
        users.find({branchId:branchId}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })  
})


router.post("/update/all",(req,res,next)=>{
    var {sex,img,name,typeName,nation}=req.body;
    let id=req.session.user._id
    
    users.update({_id:id},{$set:{sex,img,name,typeName,nation}}).then(data=>{
        res.json({
            data:"success",
            code:200,
            msg:"更新成功"
        })
    }).catch(err => {
        new Error(err)
        next(err)
    })
})



module.exports= router