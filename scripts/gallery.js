document.querySelectorAll(".moment-card").forEach(card => {
  const video = card.querySelector("video");
  if (!video) return;

  // Sicherheit: Browser-Policies
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.preload = "metadata";

  card.addEventListener("pointerenter", async () => {
    try {
      video.currentTime = 0; // optional: immer von vorne starten
      await video.play();
    } catch (e) {
      // Autoplay kann in manchen Browsern dennoch blocken
      // dann passiert einfach nichts
    }
  });

  card.addEventListener("pointerleave", () => {
    video.pause();
    video.currentTime = 0; // optional: reset beim Verlassen
  });
});
