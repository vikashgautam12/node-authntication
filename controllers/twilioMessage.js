
module.exports = async (req, res) => {
    console.log("twilio running");
    try {
        const accountSid = "AC636f592e627690a1314e14c87e4e9eb5";
        const authToken = "dc6246be705056af5e67278a04f6a641"
        const client = require('twilio')(accountSid, authToken);
        const mes = await client.messages
            .create({
                body: 'hello i am suryasen gautam',
                from: '+18149956852',
                to: '+917022720230'
                // to :  "+916387021874"
            })
            console.log(mes);
            res.status(200).json({
                title:"success",
                message:mes.body
            })
    }
    catch (err) { console.log(err) };
}
