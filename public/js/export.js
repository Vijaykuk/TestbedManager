window.onload = function() {
  displaySlides(1);
  var trdivs = document.getElementsByClassName("featureTr");
  for (var i = 0; i < trdivs.length; i++) {
    trdivs[i].addEventListener("click", function() {
      debugger;
      var selectedDiv = event.currentTarget.nextElementSibling;
      var tr1divs = document.getElementsByClassName("tr1div");
      for (var j = 0; j < tr1divs.length; j++) {
        if (
          tr1divs[j].isSameNode(selectedDiv) &&
          selectedDiv.classList.contains("hideTr")
        ) {
          debugger;
          tr1divs[j].classList.remove("hideTr");
        } else {
          tr1divs[j].classList.add("hideTr");
        }
      }
    });
  }
  navdivs = document.getElementsByClassName("navBtn");
  for (var i = 0; i < navdivs.length; i++) {
    navdivs[i].addEventListener("click", function() {
      debugger;
      for (let k = 0; k < navdivs.length; k++) {
        let cname = event.currentTarget.classList[2];
        let cname1 = cname.substring(0, cname.length - 3);
        let cdiv = document.getElementsByClassName(cname1)[0];
        if (navdivs[i].isEqualNode(event.currentTarget)) {
          cdiv.classList.add("showSlide");
          cdiv.classList.remove("hideSlide");
        } else {
          cdiv.classList.remove("showSlide");
          cdiv.classList.add("hideSlide");
        }
      }
    });
  }
};
var slide_index = 0;

nextSlide = function(n) {
  displaySlides((slide_index += n));
};

currentSlide = function(n) {
  displaySlides((slide_index = n));
};
displaySlides = function(n) {
  debugger;
  var i;
  var slides = document.getElementsByClassName("showSlider");
  if (n < 1) {
    slide_index = slides.length;
  } else {
    slide_index = n;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slide_index - 1].style.display = "block";
};
