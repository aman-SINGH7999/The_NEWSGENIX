const jwt = require('jsonwebtoken')


const auth = async (req,res,next)=>{
    
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined'){
        res.status(400).send({success:false,message:"A token is required for auth"});
    }else{
        const token = bearerHeader.split(" ")[1];
        // console.log("---------token--------",token)
        jwt.verify(token, process.env.JWT_SECRET, (err,authData)=>{
            if(err){
                res.status(400).send({success:false,message:"Token is not valid!"});
            }
            // else{
            //     res.status(200).send({success:false,msg:"User Authorized"});
            // }
        });
    }
    return next();
}

module.exports = auth;