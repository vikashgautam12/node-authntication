var nodemailer = require('nodemailer');
module.exports = async (req, res) => {
    console.log("nodemailer running");
    try{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'suryasengautam@gmail.com',
              pass: 'surya2013#'
            }
          });
          var mailOptions = {
            from: 'suryasengautam@gmail.com',
            to: 'surya21@navgurukul.org',
            subject: 'testing node mailer',
            text: ' hello suryasen i am sending this mail using node mailer.this is awesome package.'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
            res.status(200).json({
                title:"success",
                message:"mail sent"
            })
    }
    catch(err) {
        console.log(err);
    }
    
}