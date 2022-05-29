const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = async(req,res,next) =>{
    {

        user = await prisma.user.findMany()
        console.log(user.length);
        if (user.length === 0){
            return res.status(400).json({
                title:"error",
                message:"there is no data in database"
            })

        }
    }
    next()
    

    
}