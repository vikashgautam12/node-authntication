const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt  = require('jsonwebtoken')
module.exports =  async (req, res,next) => {
    try{
        const tokenAuth = req.headers["authorization"]
        if (tokenAuth === undefined){
            return res.status(400).json({
                title:"error",
                message : "user not logged in"
            })
        }

        // }
        // console.log(tokenAuth);
        const token = tokenAuth.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        try{
            const user = await prisma.user.findUnique({
                where: {
                    id:decoded.id
                }
            })
            if (user === null){
                return res.status(400).json({
                    title:"error",
                    message : "there is no data in database"
                })
            }
            if(user.token !== token){
                // console.log(user.token,"===",token);
                return res.status(400).json({
                    title:"error",
                    message:"unauthorized"
                })
            };
            req.id = decoded.id
            next()


        }
        catch(err){
            console.log(err);
            return res.status(400).json({
                title:"error",
                message:"internal server error"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            title : "internal server error"
        })
    }
}