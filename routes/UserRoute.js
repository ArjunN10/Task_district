const router=require("express").Router()
const UserController=require("../controllers/UserController")
const TrycatchMiddleware = require("../middlewares/TryCatch")
const Authverify=require("../middlewares/UserAuth")

router

// <-------------------->Register Section<----------------->

.post('/register' ,TrycatchMiddleware(UserController.UserRegister))

// <-------------------->Login Section<----------------->

.post('/login' ,TrycatchMiddleware(UserController.userlogin))
.post('/googlelogin' ,TrycatchMiddleware(UserController.googleLogin))

.post('/adddistrictV4',TrycatchMiddleware(UserController.AddDistricts))
// .get('/districtV4')

.use(Authverify)





module.exports=router



