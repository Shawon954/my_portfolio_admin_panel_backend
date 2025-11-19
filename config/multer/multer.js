const multer = require('multer');


// Set storage engine

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        cb(null, true); 
    }
});
