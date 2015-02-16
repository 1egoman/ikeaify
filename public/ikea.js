
// get all user-made words
$.get("/userwords", function(b) {
  data = JSON.parse(b);
  $.each(data, function(i, j) {
    $(".words").append("<a onclick=\"$('.input').val('"+j+"'); update();\">"+j+"</a>");
  });
});

var update = function() {
  // get input
  v = $(".input").val();

  // clear the output if input is empty
  if (v.length === 0) {
    $(".out").css("display", "none");
  } else {
    $(".out").css("display", "block");
  }

  // ikeaify the word
  $.get("/ikeaify?word="+v, function(b, s) {
    if (b !== "No word specified.") {
      data = JSON.parse(b);
      $(".out").text(data.ikea);
    };
  });
};
$('.input').on('input', update);

var save = function(word) {
  $.post("/userwords?word="+v, function(b, s) {
    console.log(b)
    if (b.indexOf('error') === -1) {
      $(".words").append("<a onclick=\"$('.input').val('"+word+"'); update();\">"+word+"</a>");
    };
  });
};
