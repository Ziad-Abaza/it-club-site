/******************************************************************************* */
/*                                  Main Script                                  */
/******************************************************************************* */
(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    loop: true,
    nav: false,
    dots: true,
    items: 1,
    dotsData: true,
  });
})(jQuery);

/******************************************************************************* */
/*                                  Template Details                              */
/******************************************************************************* */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /******************************************************************************* */
  /*                                  Portfolio Isotope and Filter                 */
  /******************************************************************************* */
  let projectsnIsotope = document.querySelector(".projects-isotope");

  if (projectsnIsotope) {
    let projectsFilter = projectsnIsotope.getAttribute("data-projects-filter")
      ? projectsnIsotope.getAttribute("data-projects-filter")
      : "*";
    let projectsLayout = projectsnIsotope.getAttribute("data-projects-layout")
      ? projectsnIsotope.getAttribute("data-projects-layout")
      : "masonry";
    let projectsSort = projectsnIsotope.getAttribute("data-projects-sort")
      ? projectsnIsotope.getAttribute("data-projects-sort")
      : "original-order";

    window.addEventListener("load", () => {
      let projectsIsotope = new Isotope(
        document.querySelector(".projects-container"),
        {
          itemSelector: ".projects-item",
          layoutMode: projectsLayout,
          filter: projectsFilter,
          sortBy: projectsSort,
        }
      );

      let menuFilters = document.querySelectorAll(
        ".projects-isotope .projects-flters li"
      );
      menuFilters.forEach(function (el) {
        el.addEventListener(
          "click",
          function () {
            document
              .querySelector(
                ".projects-isotope .projects-flters .filter-active"
              )
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            projectsIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aos_init === "function") {
              aos_init();
            }
          },
          false
        );
      });
    });
  }

  /******************************************************************************* */
  /*                                  AOS Initialization                           */
  /******************************************************************************* */
  AOS.init();

  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  window.addEventListener("load", () => {
    aos_init();
  });
});
