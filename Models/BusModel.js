const {Schema,model}=require('mongoose');
module.exports.Businfo=model('Businfo',Schema({
    Source:{
      type:String,
    //   required:true
  },
  Destination:{
      type:String,
      required:true

  },
  // Date:{
  //     type: Date
     
  // }

},{timestamps:true}))