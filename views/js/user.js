$(document).ready(function() {
  $(".parallax").parallax({
    responsiveThreshold: 300
  });
  $(".collapsible").collapsible();
  $(".tooltipped").tooltip();
  $(".header-image").css("height", $(window).height());
  new TypeIt("#typewriting", {
    speed: 100,
    lifeLike: true,
    loop: true
  })
    .type('<font color="#137a7f">I ♡ &lt;/ &gt;</font>')
    .pause(300)
    .delete(2)
    .pause(250)
    .type('<font color="#137a7f">code&gt;</font>')
    .pause(750)
    .options({
      speed: 100,
      deleteSpeed: 75
    })
    .delete()
    .pause(750)
    .type('<font color="#137a7f">Miku bot.</font>')
    .pause(1200)
    .delete(5)
    .type('<font color="#137a7f">#7881</font>')
    .pause(5000)
    .delete()
    .go();
});
let el;
$(window).scroll(function() {
  el = document.getElementsByClassName("ohidden");
  if ($(this).scrollTop() > $(".body").offset().top - 50) {
    $("nav").fadeIn(500);
  } else {
    $("nav").fadeOut(500);
  }
  for (let i = 0; i < el.length; i++) {
    if ($(this).scrollTop() > $(el[i]).offset().top - $(this).height()) {
      $(el[i]).fadeTo(1500, 1);
    }
  }
  // if ($(this).scrollTop() > $(".ohidden").offset().top - 300) {
  //   $(".ohidden").fadeTo(700, 1);
  // }
});

$(window).resize(function() {
  $(".header-image").css("height", $(window).height());
});
