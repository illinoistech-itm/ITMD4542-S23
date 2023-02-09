var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'tmp/'});
const fs = require('node:fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET File Upload page. */
router.get('/file-upload', function(req, res, next) {
  res.render('file-upload', { title: 'Express File Upload' });
});

/* POST File Upload. */
router.post('/file-upload', upload.array('userFiles'), function(req, res, next) {
  console.log(req.body);
  console.log(req.files);
  if (req.files.length > 0) {
    req.files.forEach(f => {
      fs.renameSync(`${f.path}`, `uploads/${f.filename.slice(0, 6)}-${f.originalname}`);
    });
  }
  res.send('files uploaded see console');
});

module.exports = router;
