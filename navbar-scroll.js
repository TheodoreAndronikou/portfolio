document.addEventListener("DOMContentLoaded", function () {
    var lastScrollTop = 0;

    window.addEventListener("scroll", function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        document.querySelector("nav").classList.add("nav-hidden");
      } else {
        // Scrolling up
        document.querySelector("nav").classList.remove("nav-hidden");
      }

      lastScrollTop = scrollTop;
    });
  });