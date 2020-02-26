const {Router} = require("express");
const router = Router();
var session = require('express-session')
const MongoStore = require('connect-mongo')(session);

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

router.use("/token", require("./qiniu"));
router.use("/", require("./guanliLogin"));

router.use((req,res,next)=>{
    if(req.session.user){
        next();
    }
    else{
        
        res.json({
            isLogin:false,
            data: '未登录',
            code: 400,
            msg: '未登录',
            ret: false})
            return
     
      }
})

router.use("/news", require("./news"));
router.use("/img", require("./img"));
router.use("/category", require("./category"));
router.use("/users", require("./user"));
router.use("/summary", require("./summary"));
router.use("/interact", require("./interact"));
router.use("/branch", require("./branch"));
router.use("/discuss", require("./discuss"))

module.exports = router;