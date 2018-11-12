var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



router.post('/event', function(req, res, next) {
    console.log("POST new event route");
    res.sendStatus(200);
});

router.get('/event', function(req, res, next) {
    console.log("GET event route");
});

module.exports = router;
