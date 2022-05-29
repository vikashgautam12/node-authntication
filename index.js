const express = require('express');
const app = express();
const logger = require('./logger');
const port = 5050
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
//middlewares
const userExists = require('./middlewares/userExists')
const {verifyUser,getAllUsers,loginUser,deleteAllUsers,deleteSingleUser} = require('./controllers/controllers.user')
// const verifyUserCheck = require('./middlewares/verifyUserCheck')
const initialUserCheck = require('./middlewares/initialUserCheck')
const verifyUsersCheck = require('./middlewares/verifyUsersCheck')
const initialLoginCheck = require('./middlewares/initialLoginCheck')
const checkDeleteUser = require('./middlewares/checkDeleteUser')
const auth = require('./middlewares/auth')
const nodemailer = require('./routes/nodemailer')
const twilioMessage = require('./controllers/twilioMessage')

app.use(express.json())
const {createNewUser,getUser} = require('./routes/user');
const checkSuperAdmin = require('./middlewares/checkSuperAdmin');
const checkAdmin = require('./middlewares/checkAdmin');
//password>=8,null handling,email validation,
// app.route("/").get(getAllUsers)
app.get("/",getAllUsers)
//verify user for --->active
app.post("/verify",verifyUsersCheck,verifyUser)
app.post("/login",initialLoginCheck,loginUser)
app.post("/signup",initialUserCheck,userExists,createNewUser)
//protected user after login
app.get("/protected",auth,async(req,res) => {
    const id = req.id
    const user = await prisma.user.findUnique({
        where : {
            id
        }
    })
    res.json({
        title:"success",
        message:`welcome ${user.name}`
    })
})
app.delete("/deleteAll",auth,checkSuperAdmin,checkDeleteUser,deleteAllUsers)
app.delete("/delete",auth,checkSuperAdmin,checkDeleteUser,deleteSingleUser)
app.get("/private",auth,checkAdmin,async(req, res) => {
    res.json({
        title:"success",
        "message":`accessed by admin or super admin`
    })
})
app.post('/mail',nodemailer)
app.post("/twilio",twilioMessage)
app.listen(port,() =>{
    logger.info(`app is running at  http://localhost:${port}`);
})
