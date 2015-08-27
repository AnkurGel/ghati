var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/playlist.json', function(req, res, next) {
  fs.createReadStream('data/playlist.json').pipe(res);
});

module.exports = router;
