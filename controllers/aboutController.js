
const getAboutPage = (req,res,next)=>{
    res.status(200).send("About");
    next()
}

const sendFeedback = (req,res,next)=>{
    const {feedback} = req.body;
    console.log(feedback);
    res.status(200).json({success: true});
    next();
}

module.exports = {
    getAboutPage,
    sendFeedback
}