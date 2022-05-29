const express = require('express')
const app = express();
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports.createNewUser = async(req,res) =>{
    console.log("create user running");
    // console.log(req.body);
    const {name,email,password,role} = req.body;
    try{
        // if (req.body===undefined){
        //     res.status(400).json({
        //         title:"error",
        //         message : "enter name,email,password,role"
        //     })
        // }
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password,salt) 
        const otp = await otpGenerator.generate(6,{ upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false,digits:true})
        const newUser = await prisma.user.create(
            {
                data:{
                    name,email,password:hashedPassword,otp,role
                }
            }
        )
        res.status(200).json({
            title:"success",
            data:{
                id :newUser.id,
                otp:newUser.otp,
            }
        })
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports.getUser = async(req,res) =>{
    console.log("get user running");
}
