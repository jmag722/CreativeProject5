var express = require('express');
var router = express.Router();


/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/eventDB', { useNewUrlParser: true }); //Connects to a mongo database called "eventDB"

var eventSchema = mongoose.Schema({ //Defines the Schema for this database
    Title: String,
    Address: String,
    DATE: String,
    Start: String,
    End: String,
    Description: String,
    Image: String
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
    res.sendFile('events.html', { root: 'public' });
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


//GET  ALL events
router.get('/event', function(req, res, next) {
    console.log("GET all events");

    Event.find(function(err, list) {
        if (err) {
            console.log("get error");
        }
        res.json(list);
    });
});


//GET EVENT BY TITLE
router.get('/eventTitle', function(req, res, next) {
    console.log("GET event by Title");
    console.log(req.query);
    var title = req.query["q"];
    var obj = { Title: title };
    console.log(title);
    if (title === "" || title === undefined) {
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
    if (address === "" || address === undefined) {
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
    var obj = { DATE: date };
    if (date === "" || date === undefined) {
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
    // var title = req.query["q"];
    // var obj = { Title: title };
    // if (title === "" || title === undefined) {
    //     console.log("No event to delete?");
    //     return;
    // }
    // Event.findOneAndDelete(obj, function(err) {
    //     if (err) { console.log("badDelete") };
    // });
    Event.deleteMany({}, function(err) {
       
    });
});




module.exports = router;
