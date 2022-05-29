const {isValidEmail} = require('../utils/validation');
module.exports = async(req,res,next) =>{
    const {email,password} = req.body;
    if (typeof email !== 'string'|| typeof password !== 'string'){
        return res.status(400).json({
            title:"error",
            message:"email or password is required"
        })
    }
    if(!isValidEmail(email)){
        return res.status(400).json({
            title:"error",
            message:"please provide valid email address"
        })
    }
    next()


}