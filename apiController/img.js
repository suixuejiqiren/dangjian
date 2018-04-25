var express = require('express');
var router = express.Router();
var imgs = require('../database/model/img')


router.get('/get',(req,res)=>{
    let{id,pn=1}=req.query
    let params={}
    if(!id){
        //这是没有传ID的路线
        params = {}
    }
    else{
        params._id=id
    }
    imgs.find(params).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                mag:'false',
                ret:false
            })
            return

        }
        res.json({
            data,
            code:200,
            mag:'success',
            ret:true
        })
    })

})



module.exports=router