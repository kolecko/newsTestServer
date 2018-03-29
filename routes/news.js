var express = require('express');
var router = express.Router();
var newsController = require('../controllers/news.controller');

/* GET users listing. */
router.get('/', newsController.obtain_data);

module.exports = router;
