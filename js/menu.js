(function(){
  const burger = document.getElementById("burgerBtn");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("menuClose");
  if (!burger || !overlay || !closeBtn) return;

  const links = overlay.querySelectorAll(".menu-link");

  function openMenu(){
    overlay.classList.add("is-open");
    burger.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");

    const first = overlay.querySelector(".menu-link");
    if (first) first.focus();
  }

  function closeMenu(){
    overlay.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    burger.focus();
  }

  burger.addEventListener("click", () => {
    overlay.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener("click", closeMenu);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });

  links.forEach(a => a.addEventListener("click", () => {
    // für Hash-Links: Menü zu, Navigation macht der Browser
    closeMenu();
  }));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeMenu();
  });
})();
