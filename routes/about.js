const router = require('express').Router();
const {
    getAboutPage,
    sendFeedback
} = require('../controllers/aboutController')

router.route("/").post(sendFeedback);

module.exports = router;