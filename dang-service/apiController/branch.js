var express = require('express');
var router = express.Router();
var branch = require('../database/model/branch')

router.get('/get',(req,res,next)=>{
   
    branch.find().sort({_id:-1}).then(data=>{

            res.json({
                data,
                code:200,
                mag:'success'
            })
    })

})




module.exports=router