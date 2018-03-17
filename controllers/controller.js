var mongoose = require("mongoose");

var request = require("request");

var express = require("express");

var cheerio = require("cheerio");

var router = express.Router();

var Notes = require("../models/notes.js");
var News = require("../models/news.js");

router.get("/", function(req, res) {
  res.render("index");
});

// shows news that was scraped and saved in a list.
router.get("/saved", function(req, res) {

  // grabbing News array docs
  News.find({}, function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      var hbsNewsObject = {
        articles: doc
      };
      res.render("saved", hbsNewsObject);
    }
  });
});

// GET request to scrape website
router.post("/scrape", function(req, res) {

  // uses request to grab the body of the html 
  request("http://www.nytimes.com/", function(error, response, html) {
    var $ = cheerio.load(html);

    // emptry array for saving scraped articles
    var scrapedNews = {};
    // grabs every h2 within an article tag
    $("article h2").each(function(i, element) {

      //empty result object
      var result = {};
      //saving href and text as properties 
      result.title = $(this).children("a").text();

      console.log(result.title);
      
      result.link = $(this).children("a").attr("href");

      scrapedNews[i] = result;
    });

    console.log(scrapedNews);

    var hbsNewsObject = {
        articles: scrapedNews
    };

    res.render("index", hbsNewsObject);

  });
});

router.post("/save", function(req, res) {

  console.log(req.body.title);

  var newNewsObject = {};

  newNewsObject.title = req.body.title;

  newNewsObject.link = req.body.link;

  var entry = new News(newNewsObject);

  console.log(entry);

  // saving the entry to the database
  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(doc);
    }
  });

  res.redirect("/saved");

});

router.get("/delete/:id", function(req, res) {
  console.log(req.params.id);

  News.findOneAndRemove({"_id": req.params.id}, function (err, offer) {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
    }
    res.redirect("/saved");
  });
});

router.get("/notes/:id", function(req, res) {

  console.log(req.params.id);

  Note.findOneAndRemove({"_id": req.params.id}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
    }
    res.send(doc);
  });
});

// grabs the article by it's ID
router.get("/news/:id", function(req, res) {
  console.log(eq.params.id);

  News.findOne({"_id": req.params.id})

  .populate('notes')

  .exec(function(err, doc) {
    if (err) {
      console.log("error");
    }
    else {
      console.log(doc);
      res.json(doc);
    }
  });
});

// Creates a note
router.post("/news/:id", function(req, res) {

  var newNote = new Notes(req.body);
  newNote.save(function(error, doc) {
    if (error) {
      console.log(error);
    } 
    else {
      News.findOneAndUpdate({ "_id": req.params.id }, {$push: {notes: doc._id}}, {new: true, upsert: true})
      .populate('notes')
      .exec(function (err, doc) {
        if (err) {
          console.log("error");
        } else {
          console.log(doc.notes);
          res.send(doc);
        }
      });
    }
  });
});
// Export routes for server.js
module.exports = router;