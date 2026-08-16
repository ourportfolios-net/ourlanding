/* Scroll-reveal helper.
   Adds `data-reveal` to any element; it fades/slides in when it enters the
   viewport. Honors prefers-reduced-motion and degrades gracefully without JS.
*/
(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var els = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]"),
  );
  if (!els.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) {
      el.classList.add("is-revealed");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  els.forEach(function (el) {
    io.observe(el);
  });
})();
