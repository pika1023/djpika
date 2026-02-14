  (function () {
    const header = document.getElementById("siteHeader");
    if (!header) return;

    const THRESHOLD = 40; // px: ab dieser Scroll-Position wird der Header "compact"

    function update() {
      const y = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle("is-compact", y > THRESHOLD);
    }

    // Initial
    update();

    // Scroll listener (performant)
    window.addEventListener("scroll", update, { passive: true });
  })();

