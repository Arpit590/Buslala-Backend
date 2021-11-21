const {Schema,model}=require('mongoose');
module.exports.Trip=model('Trip',Schema({
    Source:{
      type:String,
    //   required:true
  },
  Destination:{
      type:String,
      required:true

  },
  Date:{
      type: Date
     
  }

},{timestamps:true}))