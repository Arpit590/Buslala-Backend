require("dotenv").config();
const bcrypt= require('bcrypt');
const _=require('lodash');
const jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const otpGenerator=require('otp-generator');
const sgMail=require('@sendgrid/mail')
const {User}=require('../Models/User_models')
const {Otp}=require('../Models/OtpModels');
const { Profile}=require('../Models/User_info');
const{Trip}=require('../Models/TripModels')
const {Businfo}=require('../Models/BusModel');
const { response } = require('express');
const { profile } = require("console");
const Api_key="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";


// ******************************************SignUp*****************************************************************

module.exports.signUp=async(req,res)=>{
  const user=await User.findOne({
      number:req.body.number

  });
  if(user)return res.status(400).send("User Already Registered!!")
   const OTP=otpGenerator.generate(6,{
       digits:true,alphabets:false,upperCase:false,specialChars:false
   });
   const number= req.body.number;
   const client=require('twilio')(process.env.accountSID,process.env.authToken)
   client.messages.create({
       to:`+91${number}`,
       from:'+14506003133',
       body:`Hello!! Welcome to Buslala. Here's your Otp:${OTP}`
   })

   console.log(OTP)
   const otp=new Otp({number : number,otp:OTP});
   const salt =await bcrypt.genSalt(10)
   otp.otp=await bcrypt.hash(otp.otp,salt);
   const result =await otp.save();
   return res.status(200).send("Otp sent successfully");


}

// ********************************************verifyOtp******************************************************

module.exports.verifyOtp=async(req,res)=>{
const otpHolder=await Otp.find({

    number:req.body.number,
    
});
if(otpHolder.length===0) return res.status(400).send("You use an expired Otp!!")
const rightOtpFind = otpHolder[otpHolder.length - 1];
// console.log(rightOtpFind)
console.log(req.body.otp)
// const rightOtp=await req.body.otp;
const validuser=await bcrypt.compare(req.body.otp,rightOtpFind.otp);
if(rightOtpFind.number===req.body.number&&validuser){
    const user = new User(_.pick(req.body,["number"]));
    user.save();
    console.log(user);
    const token = jwt.sign(
        user.toJSON(), process.env.JWT_SECRET_KEY,
      );
    res.cookie('jwt',token,{httpOnly:true});
    const OTPDelete=await Otp.deleteMany({
        number:rightOtpFind.number
    });
    return res.status(200).send({
        message: "User Register Successfully",
        token:token,
        // data:result,
    });
 } else{
       return res.status(400).send("Wrong Otp")

    }
}
// ********************************************Profile Data Route*************************************************
module.exports.User_data=async(req ,res)=>{
    var profile = new Profile({
        name: req.body.name,
        address:req.body.address,
        Email: req.body.Email,
        number: req.body.number
    })
    
    profile.save(() => {
        res.status(200).send("<h1>Data saved </h1>")
        const client=require('twilio')(process.env.accountSID,process.env.authToken)
        client.messages.create({
            to:`+91${profile.number}`,
            from:'+14506003133',
            body:`Hello!! Welcome to Buslala. Here's your Otp:${profile.name}`
        })
    })
}

module.exports.UserProfile=async(req ,res)=>{
    
     Profile.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.send({ details: allDetails })
        }
    })
}


// ******************************************One way details*****************************************************88

module.exports.one_way=async(req,res)=>{
    var trip = new Trip({
        Source: req.body.Source,
        Destination: req.body.Destination,
        Date: req.body.Date,
        

    }) 
    trip.save(() => {
        res.send("<h1>Booking Saved </h1>")
    })
}

module.exports.ADDBus=async(req,res)=>{
    const busdata= new Businfo({
        Source:req.body.Source,
        Destination:req.body.Destination,
        Date:req.body.Date
    })
    busdata.save(()=>{
       res.send("<h1>Bus data saved</>")
       console.log(busdata)
    })
    // res.send(busData)
};

// *********************************search oneWay Bus******************************************************************

module.exports.CheckOneWayBus=async(req,res)=>{
    const Find_bus=await Businfo.findOne({
        Source:req.body.Source,
        Destination:req.body.Destination,
  
    });
    if(Find_bus)return res.status(200).send(Find_bus)
    else return res.status(400).send("Sorry Bus is not avialable fro this route!!")
}

// ***********************************************Two_wayBus**************************************************

// module.exports.CheckTwoeWayBus=async(req,res)=>{
//     const Find_bus=await Businfo.findOne({
//         Source:req.body.Source,
//         Destination:req.body.Destination,
        
//     });
//     if(Find_bus)return res.status(200).send(Find_bus)
//     else return res.status(400).send("Sorry Bus is not avialable fro this route!!")}

// *************************************************Booking_Enquiry*************************************************

module.exports.EmailSend=async(req,res)=>{
    const Email=req.body.Email
    sgMail.setApiKey(Api_key)
    const mssg=  {
        to:`${Email}`,
        from:{
            name:"Buslala",
            email:`ynitin407@gmail.com`
        },
        Subject:'Hello this is demo',
        text:'Hello demo',
        html:'<h1> Hello!!Welcome to Buslala. Your Booking query has been recorded.And send to our executive. </h1>',
  }
  sgMail.send(mssg).then(res.send('Email successfull'))
  
  setTimeout(function(){
    sgMail.setApiKey(Api_key)
    const mssg2=  {
        to:`ynitink25@gmail.com`,
        from:{
            name:"Buslala",
            email:`ynitin407@gmail.com`
        },
        Subject:'Hello this is demo',
        text:'Hello demo',
        html:'<h1>Hello Admin!! A Booking query has been Recorded .</h1>',
  }
    sgMail.send(mssg2)}, 3000);  
}
// *************************************************************************************************************