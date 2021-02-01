const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(16).toString('hex') + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
