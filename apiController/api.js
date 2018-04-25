const {Router} = require("express");
const router = Router();
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const getData=require('./getData')


router.use(session({
    secret:'lzx',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600*1000*24*30} ,//是否为安全的cookie(是不是HTTPS)不是则false
    expires: 3600*1000*30,
    store: new MongoStore({
      url: 'mongodb://localhost/dangcrm',
      ttl: 60*60*24*30
  })
  }))


router.use("/imgs", require("./img"));
router.use("/user", require("./login"));
router.use("/news", require("./news"));
router.use("/user", require("./isLogin"));
router.get("/getData",(req,res,next)=>{
    getData().then(data=>{
        res.json({
            data,
            code:200,
            msg:"success"
        })
    })
})

router.use((req,res,next)=>{
    if(req.session.user){
        
        next();
    }   
    else{
        
        res.json({
            isLogin:false,
            data: '未登录',
            code: 400,
            ret: false})
            return
      }
})


router.use("/summary", require("./summary"));
router.use("/user", require("./changePwd"));
router.use("/user", require("./userGet"));
router.use("/interact", require("./interact"));
router.use("/user", require("./logout"));
router.use("/discuss", require("./discuss"));
router.use("/branch", require("./branch"));
router.use("/score", require("./score"));


module.exports = router;