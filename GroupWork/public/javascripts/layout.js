var menuHeight = $("#menu-wrap").height();
var startPos = 0;
$(window).scroll(function(){
  var currentPos = $(this).scrollTop();
  if (currentPos > startPos) {
    if($(window).scrollTop() >= 200) {
      $("#menu-wrap").css("top", "-" + menuHeight + "px");
    }
  } else {
    $("#menu-wrap").css("top", 0 + "px");
  }
  startPos = currentPos;
});