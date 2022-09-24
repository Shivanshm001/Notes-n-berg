const nodemailer = require('nodemailer');
const getAboutPage = (req,res,next)=>{
    res.status(200).send("About");
    next()
}

const sendFeedback = (req,res,next)=>{
    const {email,subject,msg}  = req.body;
    console.log(email,subject,msg);
    res.status(200).json({success: true});
    next();
}

module.exports = {
    getAboutPage,
    sendFeedback
}