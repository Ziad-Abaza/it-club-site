/******************************************************************************* */
/*                                  Main Script                                  */
/******************************************************************************* */
(function ($) {
  "use strict";

  /******************************************************************************* */
  /*                                  Spinner                                      */
  /******************************************************************************* */
  var spinner = function () {
    setTimeout(function () {
      var spinnerElement = $("#spinner");
      if (spinnerElement.length > 0) {
        spinnerElement.removeClass("show");
      }
    }, 1);
  };
  spinner();

  /******************************************************************************* */
  /*                                  WOW.js Initialization                       */
  /******************************************************************************* */
  if (typeof WOW !== "undefined") {
    new WOW().init();
  } else {
    console.warn("WOW.js library is not loaded.");
  }

  /******************************************************************************* */
  /*                                  Sticky Navbar                               */
  /******************************************************************************* */
  $(window).scroll(function () {
    var stickyTop = $(".sticky-top");
    if ($(this).scrollTop() > 300) {
      stickyTop.addClass("shadow-sm").css("top", "0px");
    } else {
      stickyTop.removeClass("shadow-sm").css("top", "-100px");
    }
  });

  /******************************************************************************* */
  /*                                  Back to Top Button                          */
  /******************************************************************************* */
  $(window).scroll(function () {
    var backToTop = $(".back-to-top");
    if ($(this).scrollTop() > 300) {
      backToTop.fadeIn("slow");
    } else {
      backToTop.fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  /******************************************************************************* */
  /*                                  Counter Up                                  */
  /******************************************************************************* */
  var counterElements = $('[data-toggle="counter-up"]');
  if (counterElements.length > 0 && typeof $.fn.counterUp !== "undefined") {
    counterElements.counterUp({
      delay: 10,
      time: 2000,
    });
  } else {
    console.warn("CounterUp library is not loaded or no elements found.");
  }

  /******************************************************************************* */
  /*                                  Date & Time Picker                          */
  /******************************************************************************* */
  if ($.fn.datetimepicker) {
    $(".date").datetimepicker({
      format: "L",
    });
    $(".time").datetimepicker({
      format: "LT",
    });
  } else {
    console.warn("DateTimePicker library is not loaded.");
  }

  /******************************************************************************* */
  /*                                  Header Carousel                             */
  /******************************************************************************* */
  if ($(".header-carousel").length > 0 && $.fn.owlCarousel) {
    $(".header-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      loop: true,
      nav: false,
      dots: true,
      items: 1,
      dotsData: true,
    });
  } else {
    console.warn("OwlCarousel library is not loaded or no elements found.");
  }
})(jQuery);

/******************************************************************************* */
/*                                  Template Details                             */
/******************************************************************************* */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /******************************************************************************* */
  /*                                  Portfolio Isotope and Filter                 */
  /******************************************************************************* */
  let projectsnIsotope = document.querySelector(".projects-isotope");
  if (projectsnIsotope) {
    let projectsFilter =
      projectsnIsotope.getAttribute("data-projects-filter") || "*";
    let projectsLayout =
      projectsnIsotope.getAttribute("data-projects-layout") || "masonry";
    let projectsSort =
      projectsnIsotope.getAttribute("data-projects-sort") || "original-order";

    window.addEventListener("load", () => {
      let projectsContainer = document.querySelector(".projects-container");
      if (projectsContainer && typeof Isotope !== "undefined") {
        let projectsIsotope = new Isotope(projectsContainer, {
          itemSelector: ".projects-item",
          layoutMode: projectsLayout,
          filter: projectsFilter,
          sortBy: projectsSort,
        });

        let menuFilters = document.querySelectorAll(
          ".projects-isotope .projects-flters li"
        );
        menuFilters.forEach(function (el) {
          el.addEventListener(
            "click",
            function () {
              let activeFilter = document.querySelector(
                ".projects-isotope .projects-flters .filter-active"
              );
              if (activeFilter) activeFilter.classList.remove("filter-active");
              this.classList.add("filter-active");
              projectsIsotope.arrange({
                filter: this.getAttribute("data-filter"),
              });

              // Re-initialize AOS after filtering
              if (typeof aos_init === "function") {
                aos_init();
              }
            },
            false
          );
        });
      } else {
        console.warn("Isotope library is not loaded or no container found.");
      }
    });
  } else {
    console.warn("No Isotope project container found.");
  }

  /******************************************************************************* */
  /*                                  AOS Initialization                           */
  /******************************************************************************* */
  function aos_init() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    } else {
      console.warn("AOS library is not loaded.");
    }
  }

  window.addEventListener("load", () => {
    aos_init();
  });
});
