document.querySelectorAll(".clasificare").forEach(function (clasificare) {
  clasificare.addEventListener("click", function () {
    var content = document.getElementById("modal-container");
    if (content.style.display === "none" || content.style.display === "") {
      this.innerHTML =
        "<i class='fa-solid fa-circle-chevron-up'></i> Clasificare";
      content.style.display = "block";
      this.style.border = "1.5px solid #f1f1f1";
    } else {
      this.innerHTML =
        "<i class='fa-solid fa-circle-chevron-down'></i> Clasificare";
      content.style.display = "none";
      this.style.border = "none";
    }
  });
});

document.querySelectorAll("#arb").forEach(function (arb) {
  arb.addEventListener("click", function () {
    var content = document.getElementById("arbaleta");
    if (content.style.display === "none" || content.style.display === "") {
      this.innerHTML =
        "<i class='fa-solid fa-circle-chevron-up'></i> ARBALETA";
      content.style.display = "block";
      this.style.border = "1.5px solid #f1f1f1";
    } else {
      this.innerHTML =
        "<i class='fa-solid fa-circle-chevron-down'></i> ARBALETA";
      content.style.display = "none";
      this.style.border = "none";
    }
  });
});
