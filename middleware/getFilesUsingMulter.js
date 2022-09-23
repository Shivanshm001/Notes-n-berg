const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });


const getFilesUsingMulter = (req,res,next) =>{
   const {filetype} = req.params;
   upload.single(`${filetype}`);
}

module.exports = {
    getFilesUsingMulter
}