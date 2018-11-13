var express = require('express');
var router = express.Router();


/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/eventDB', { useNewUrlParser: true }); //Connects to a mongo database called "eventDB"

var eventSchema = mongoose.Schema({ //Defines the Schema for this database
    Title: String,
    Address: String,
    Time: String,
    Description: String
});

//MONGOOSE TAKES collection name and PLURALIZES IT!!!-----
var Event = mongoose.model('Event', eventSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



router.post('/event', function(req, res, next) {
    console.log("POST new event route");
    console.log(req.body);

    var newEvent = new Event(req.body);

    newEvent.save(function(err, post) {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});



//GET EVENT BY TITLE
router.get('/eventTitle', function(req, res, next) {
    console.log("GET event by Title");
    console.log(req.query);
    var title = req.query["q"];
    var obj = { Title: title };
    if (title === "") {
        obj = {};
    }
    Event.find(obj, function(err, list) {
        if (err) {
            console.log("get error");
        }
        res.json(list);
    });
});

//GET EVENT BY Address
router.get('/eventAddress', function(req, res, next) {
    console.log("GET event by Address");
    console.log(req.query);
    var address = req.query["q"];
    var obj = { Address: address };
    if (address === "") {
        obj = {};
    }
    Event.find(obj, function(err, list) {
        if (err) {
            console.log("get error");
        }
        res.json(list);
    });
});

//GET EVENT BY Date
router.get('/eventDate', function(req, res, next) {
    console.log("GET event by Date");
    console.log(req.query);
    var date = req.query["q"];
    var obj = { Time: date };
    if (date === "") {
        obj = {};
    }
    Event.find(obj, function(err, list) {
        if (err) {
            console.log("get error");
        }
        res.json(list);
    });
});

router.delete('/delete', function(req, res, next) {
    console.log("In the DELETE event route");
    var title = req.query["q"];
    var obj = { Title: title };
    if (title === "") {
        console.log("No event to delete?");
        return;
    }
    Event.findOneAndDelete(obj, function(err) {
        if (err) { console.log("badDelete") };
    });
});




module.exports = router;
