
var gen = function(word) {
  // console.log("WORD", word)
  word = word.toLowerCase()
  out = []
  repeaters = ['a', 'e', 'i', 'n', 'r']

  // create seed
  seed = 0;
  word.split('').forEach(function(i, ct) {
    seed += word.charCodeAt(ct);
  });
  seed = seed / word.length
  console.log("SEED", seed)

  reps = word.split('').map(function(i) {
    return repeaters.indexOf(i) !== -1
  });

  word.split('').forEach(function(i, ct) {
    repeat= (i === 'a' && ct > word.length*0.5) ||
            (i === 'b' && ct > word.length*0.5) ||
            (i === 'c' && ct > word.length*0.5) ||
            (i === 'd' && ct > word.length*0.5) ||
            (i === 'e' && ct > word.length*0.5) ||
            (i === 'f' && ct > word.length*0.5) ||
            (i === 'g' && ct > word.length*0.5) ||
            (i === 'h' && ct > word.length*0.5) ||
            (i === 'i' && ct > word.length*0.5) ||
            (i === 'j' && ct > word.length*0.5) ||
            (i === 'k' && ct < word.length*0.75) ||
            (i === 'l') ||
            (i === 'm' && ct > word.length*0.5) ||
            (i === 'n' && ct != 0) ||
            (i === 'o' && ct > word.length*0.5) ||
            (i === 'p' && ct > word.length*0.5) ||
            (i === 'q' && ct > word.length*0.5) ||
            (i === 'r' && ct < word.length*0.25) ||
            (i === 's' && ct > word.length*0.6) ||
            (i === 't' && ct > word.length*0.5) ||
            (i === 'u' && ct > word.length*0.5) ||
            (i === 'v' && ct > word.length*0.5) ||
            (i === 'w' && ct > word.length*0.5) ||
            (i === 'x' && ct > word.length*0.5) ||
            (i === 'y' && ct > word.length*0.5) ||
            (i === 'z' && ct > word.length*0.5)

    if (repeat && seed > ct + 100) {
      out.push(i);
      out.push(i);
    } else {
      out.push(i);
    }
  });

  out = out.join('').replace("o", "ö").replace("u", "ü").replace("e", "ë").replace("aa", function() {
    return seed > 105 ? "k" : "aa"
  }).replace("ea", function() {
    return seed > 106.5 ? "ed" : "ea"
  }).replace("ch", function() {
    return seed > 102 ? "je" : "ea"
  }).replace("ee", function() {
    return seed > 103 && seed < 105 ? "at" : "ee"
  }).replace("rt", function() {
    return seed > 110 ? "ck" : "rt"
  }).replace("by", function() {
    return seed > 102 && seed < 105 ? "pa" : "by"
  }).replace("yy", function() {
    return seed > 109 ? "" : "yy"
  }).replace("eee", function() {
    return seed > 107.5 ? "i" : "e"
  }).replace("er", function() {
    return seed > 104.9 ? "vo" : "er"
  }).replace("be", function() {
    return seed < 105 ? "nd" : "be"
  }).replace("ht", function() {
    return seed > 106 ? "pa" : "ht"
  }).replace("hh", function() {
    return seed > 109 ? "av" : "hh"
  }).replace("am", function() {
    return seed < 105 ? "dt" : "am"
  });

  return out;
};

module.exports = gen;
console.log(gen("feel"));
