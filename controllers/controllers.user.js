const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const getAlluser = async(req,res) =>{
    console.log("get all user running");
}
module.exports = {getAlluser}
module.exports.verifyUser = async(req,res) =>{
    const {id,otp} = req.body;
    try{
        const user = await prisma.user.findUnique({
        where : {
            id
        }
    })
    if (user.otp !== otp){
        return res.status(400).json({
            title:"error",
            message : "user verified"
        })
    }
    await prisma.user.update({
        where : {
            id,
        },
        data:{
            active:true
        }
    })
    res.json({
        title:"success",
        message     : "user verified"
    })
    }catch(err){
        console.log(err);
    }
}
// get all users
module.exports.getAllUsers =  async (req, res) => {
    console.log("get all users running");
    try {
      const resp = await prisma.user.findMany({})
      console.log(resp);
      res.status(200).json({ msg: "Success", data: resp});
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err.message, data: err.data});
    }
}

// login users
module.exports.loginUser = async (req, res) => {
    console.log("login user running");
    const { email, password } = req.body;
    // console.log(email, password);
    try {
        const userCount = await prisma.user.count({
        // console.log(userCount);

            where: {
                email,
            }
        })
        // console.log(userCount);
        if(userCount ===0){
            return res.status(400).json({
                title:"error",
                message : "user not found"
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        // console.log(user);
        if (user.active === false){
            return res.status(400).json({
                title:"error",
                message : "user not verified"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                title:"error",
                message : "invalid password"
            })
        }
        //token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: "24h"});
        await prisma.user.update({
            where: {
                email

            },
            data :{
                token
            }
        })
        console.log(user);
        res.json({
            title:"success",
            token
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title:"internal server error" });
    }
}


//delete all users
module.exports.deleteAllUsers = async (req, res) => {
    console.log("delete all users running");
    try{
        await prisma.user.deleteMany()
        res.status(200).json({ title:"success", message:"all users deleted"})


    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title:"internal server error" });
    }
}

//delete single user
module.exports.deleteSingleUser = async (req, res) => {
    console.log("delete single users running");
    const email = req.body.email;
    try{
        const deleteUser = await prisma.user.delete({
            where: {
                email
            }
        })
        // await prisma.user.deleteMany()
        console.log(deleteUser);
        res.status(200).json({ title:"success", message:`deleted ${deleteUser.name}`})
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title:"internal server error" });
    }
}
