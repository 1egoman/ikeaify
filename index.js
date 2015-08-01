var app = require("express")();
var es = require("express-static")
var ikea = require("./ikeame");
var fs = require("fs")

app.use(es(__dirname+"/public"));
app.use(function(req, res, next) {
  console.log(req.method, req.url, req.params, req.body);
  next();
})

// ikeaifcation!
app.get("/ikeaify", function(req, res) {
  if (req.query.word) {
    res.send(JSON.stringify({
      word: req.query.word,
      ikea: ikea(req.query.word)
    }));
  } else {
    res.send("No word specified.");
  }
});

// store and retreive user suggested words
app.get("/userwords", function(req, res) {
  fs.readFile("words.json", function(err, chunk) {
    if (err) {
      res.send("{\"error\": \"FILE ERROR\"}");
      return;
    }

    words = chunk.toString();
    res.send(words);
  });
});

app.post("/userwords", function(req, res) {

  // get words
  fs.readFile("words.json", function(err, chunk) {
    if (err) {
      res.send("{\"error\": \"FILE ERROR\"}");
      return;
    }

    words = JSON.parse(chunk.toString());

    // test for a valid word
    if (
      req.query.word &&
      words.indexOf(req.query.word) === -1 &&
      req.query.word.length > 3
    ) {
      words.push(req.query.word);

      // save the words
      fs.writeFile("words.json", JSON.stringify(words), function(err) {
        if (err) {
          res.send("{\"error\": \"FILE ERROR\"}");
          return;
        }
        res.send("{\"ok\": \"ok\"}")
      });
    } else {
      res.send("{'error': 'Not a valid word or already been mentioned.'}")
    }

  });
});

app.listen(process.env.PORT || 8000);
console.log(process.env.PORT || 8000)
