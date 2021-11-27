var mongoose= require('mongoose');
const {Schema,model}=require('mongoose');

module.exports.Profile=model('Profile',Schema({
    name:{
        type:String,
      //   required:true
    },
    number:{
        type:Number
    },
    Email:{
        type:String,
        required:true
  
    },
    gender:{
        type: String,
    },
    Age:{
        type: String,
    }
  
  },{timestamps:true}))