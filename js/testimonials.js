(function(){
  const track = document.getElementById("testimonialTrack");
  const dotsContainer = document.getElementById("testimonialDots");
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.querySelectorAll(".testimonial-slide"));
  if (slides.length === 0) return;

  let index = 0;

  function setActive(i){
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((s, si) => s.classList.toggle("is-active", si === index));
    dotsContainer.querySelectorAll("button").forEach((d, di) =>
      d.classList.toggle("active", di === index)
    );
  }

  dotsContainer.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Testimonial ${i+1}`);
    dot.addEventListener("click", () => setActive(i));
    dotsContainer.appendChild(dot);
  });

  setActive(0);
  setInterval(() => setActive((index + 1) % slides.length), 6500);
})();
