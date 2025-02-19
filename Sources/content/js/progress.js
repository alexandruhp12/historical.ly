var fH = 0;
var mybutton = document.getElementById("btn");
var scrollPercent = 0;
var documentHeight = document.body.scrollHeight;
var minHeight = 0;
var maxHeight = 0;

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  var docHeight = document.documentElement.scrollHeight;

  if (fH === 0) {
    minHeight = docHeight;
    fH = 1;
  }

  

  maxHeight = minHeight;
  if (maxHeight < docHeight) {
    maxHeight = docHeight;
  }
  var windowHeight = window.innerHeight;

  if (docHeight === minHeight) {
    if (docHeight - scrollPosition > (maxHeight - minHeight) / 2) {
      if (scrollPercent < scrollPosition) {
        scrollPercent = scrollPosition;
        document.getElementById("progress-bar").style.width =
          ((scrollPercent + (maxHeight - minHeight) / 2) * 100) / 6104 + "%";
      }
    }
  } else if (docHeight === maxHeight) {
    if (docHeight - scrollPosition > (maxHeight - minHeight) / 2) {
      if (scrollPercent < scrollPosition) {
        scrollPercent = scrollPosition;

        document.getElementById("progress-bar").style.width =
          ((scrollPercent + (maxHeight - minHeight) / 2) * 100) / docHeight +
          "%";
      }
    } else {
      document.getElementById("progress-bar").style.width = "100%";
      scrollPercent = maxHeight;
    }
  }

  if (scrollPosition > 20) {
    var documentHeight = document.body.scrollHeight;
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
