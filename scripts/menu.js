// js/menu.js  (ohne <script>-Tags)
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
    document.body.style.overflow = "hidden";
    // Fokus auf erstes Menü-Item
    const first = overlay.querySelector(".menu-link");
    if (first) first.focus();
  }

  function closeMenu(){
    overlay.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    burger.focus();
  }

  burger.addEventListener("click", () => {
    const isOpen = overlay.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener("click", closeMenu);

  // Klick auf den dunklen Hintergrund schließt
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });

  // Klick auf Link schließt (und springt zur Section)
  links.forEach(a => a.addEventListener("click", closeMenu));

  // ESC schließt
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeMenu();
  });
})();
