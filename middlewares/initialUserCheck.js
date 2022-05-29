const {isValidPassword,isValidEmail} = require('../utils/validation');
module.exports = async(req,res,next) =>{
    const {name,email,password,role} = req.body;
    if (typeof name !== "string" || 
    typeof email!=="string" ||
    typeof password !== "string")
     {
         res.status(400).json({
             title : "error",
             message : "name,email,password,role is required"
         })
     }
     if (!isValidEmail(email)){
         return res.status(400).json({
             title:"error",
             "message":"invalid email"
         })
     }
    //  console.log(role);
     if (role !== undefined && role!== "admin" && role!== "super admin"){
            return res.status(400).json({
                title:"error",
                "message":"invalid role"
            })
     }
     if (!isValidPassword(password)){
        return res.status(400).json({
            title:"error",
            "message":"password length must be grater than or equal to 8 and should be alphanumeric"
        })

    }
    next()
  
    
}