$(document).ready(function() {
  $(".heart").click(function() {

    $(this).toggleClass("fas");
    $(this).toggleClass("far");
    console.log($(this).siblings("a").text());
    if ($(this).hasClass("fas")) {
      $(this).css('color', 'blue');
      alert(`${$(this).siblings("a").text()} added to favorites`);
    } else {
      alert(`${$(this).siblings("a").text()} removed from favorites`);
    }

  });
});
