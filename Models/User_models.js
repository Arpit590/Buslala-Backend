const {Schema,model}=require('mongoose')
const jwt=require('jsonwebtoken');

const JWT_SECRET_KEY='HFFDSDFEEFFEGESSCD';

const userSchema=Schema({
    
    name:{
        default:'',
        type:String 
     },
    number:{
        default:'',
        type:Number 
     },
    Email:{
        default:'',
        type:String 
     },
    gender:{
        default:'',
        type:String 
     },
    Age:{
        default:'',
        type:String 
     }
    },{timestamps:true});

    userSchema.methods.generateJWT=function(){
        const token=jwt.sign({
            _id:this._id,
            number:this.number,
        },JWT_SECRET_KEY,{expiresIn:"7d"});
        return token
    }

    module.exports.User=model('User',userSchema);