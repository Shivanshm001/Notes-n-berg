const router = require('express').Router();
const {
    getAboutPage,
    sendFeedback
} = require('../controllers/aboutController')

router.route("/").get(getAboutPage).post(sendFeedback);

module.exports = router;