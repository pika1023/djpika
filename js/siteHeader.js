(function () {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const THRESHOLD = 40;

  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("is-compact", y > THRESHOLD);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
})();
