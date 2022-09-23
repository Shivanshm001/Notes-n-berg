
const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
const {
    getUpload,
    uploadFile,
    uploadLink
} = require('../controllers/uploadController')



router.post("/image",upload.single("image"),uploadFile);
router.post("/pdf",upload.single("pdf"),uploadFile);
router.post("/link",upload.single("link"),uploadLink);

module.exports = router;