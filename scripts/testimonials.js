(function(){
  const track = document.getElementById("testimonialTrack");
  const dotsContainer = document.getElementById("testimonialDots");

  if(!track) return;

  const slides = document.querySelectorAll(".testimonial-slide");
  let index = 0;

  function updateSlider(){
    track.style.transform = `translateX(-${index * 100}%)`;

    dotsContainer.querySelectorAll("button").forEach((dot,i)=>{
      dot.classList.toggle("active", i === index);
    });
  }

  function createDots(){
    slides.forEach((_,i)=>{
      const dot = document.createElement("button");
      dot.addEventListener("click", ()=>{
        index = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function nextSlide(){
    index++;
    if(index >= slides.length) index = 0;
    updateSlider();
  }

  createDots();
  updateSlider();

  setInterval(nextSlide, 6000);
})();
