const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async(req,res,next) => {
    const id  = req.id
    try{
        const user = await prisma.user.findUnique({
            where : {
                id}
            });
        if (user.role !== "super admin" || user.role !== "admin"){
            return res.status(401).json({
                title:"error",
                message:"accessed by admin or super admin"
            })
        }
        next()
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            title: 'internal server Error'
        })
    }
}