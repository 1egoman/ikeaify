var app = require("express")();
var es = require("express-static")
var ikea = require("./ikeame");
var fs = require("fs")

app.use(es(__dirname+"/public"));

app.get("/ikeaify", function(req, res) {
  if (req.query.word) {
    res.send(JSON.stringify({
      word: req.query.word,
      ikea: ikea(req.query.word)
    }));
  } else {
    res.send("No word specified.")
  }
});

app.listen(process.env.PORT || 8000)
