module.exports.log_get=(req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.send('user logout');
}
module.exports.signUp=(req,res)=>{
    
}
