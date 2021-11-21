const router=require('express').Router();
const { verify } = require('crypto');
const { signUp,verifyOtp,User_data,one_way,UserProfile,CheckOneWayBus,EmailSend,ADDBus}=require('../Controllers/UserController')
// const User_data=require('../')
const { requireAuth}=require('../Middleware/Auth')
const {log_get}=require('../Controllers/FlowController')

router.route('/signup')
.post(signUp);

router.route('/signup/verify')
.post(verifyOtp)

router.route('/User_data',requireAuth)
.post(ADDBus)

router.route('/one_way',requireAuth)
.post(one_way)

router.route('/searchOneWayBus',requireAuth)
.post(CheckOneWayBus)

router.route('/Booking_query',requireAuth)
.post(EmailSend)

router.route('/logout',requireAuth)
.get(log_get)

router.route('/profile',requireAuth)
.get(UserProfile)

module.exports=router;