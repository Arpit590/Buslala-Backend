const jwt=require('jsonwebtoken')
const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
      jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decodedToken)=>{
         if(err){
             console.log("Not Auth Try again" )
             res.send('Error')
         }
         else{
             console.log("auth verified user")
             next();
         }

      })
    }
    else{
        res.send("Not Authorized");
    }
}

module.exports={requireAuth};