const router = require('express').Router();
const {
    sendFeedback
} = require('../controllers/aboutController')

router.route("/").post(sendFeedback);

module.exports = router;