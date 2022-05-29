const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = async(req,res,next) =>{
    const email = req.body.email;
    try{
        const userCount = await prisma.user.count({
            where:{email}
        })
        if (userCount==1){
            return res.status(400).json({
                title:"error",
                message:"user already exists"
            })
        }
        next()

    }
    catch(err){
        console.log(err.message);
    }
}