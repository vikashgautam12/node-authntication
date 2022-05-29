const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports= async(req,res,next) => {
    try{
        const {id,otp} = req.body;

        if (typeof id !== "string" || typeof otp !== "string"){
            console.log(id,otp);
            return res.status(400).json({
                title : "error",
                message : "id and otp is required" 
            })
        }
        const userCount = await prisma.user.count({
            where: {
                id
            }
        })
        if( userCount ==0){
            return res.status(400).json({
                title : "error",
                message:"USER DOES NOT EXIST"
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (user.active === true){
            return res.status(400).json({
                title:"error",
                message:"user already verified"
            })
        }
        next()
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            title : "internal server error"
        })

    }

}