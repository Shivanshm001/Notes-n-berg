const axios = require('axios');

async function sendEmail() {

}

const sendFeedback = async (req, res, next) => {
    const { name, subject, msg } = req.body;
    console.log(name, subject, msg);
    //Emailjs
    let emailData = {
        service_id: process.env.EMAILJS_SERVICE_KEY,
        template_id: process.env.EMAILJS_TEMPLATE_KEY,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken : process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
            from_name: name,
            to_name: 'Shivansh mishra',
            subject: subject,
            message: msg,
        }
    }
    try {
        const { data } = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData);
        console.log(`Axios response data: ${data}`);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false});
    }
    //Emailjs end
    next();
}

module.exports = {
    sendFeedback
}