(function(){
  const iframe = document.getElementById("contactForm");
  if(!iframe) return;

  function resizeIframe(){
    try {
      const innerDoc = iframe.contentWindow.document;
      const height = innerDoc.body.scrollHeight;
      if(height) {
        iframe.style.height = height + "px";
      }
    } catch (e) {
      /* Google Forms ist cross-origin.
         Wenn Zugriff blockiert wird,
         setzen wir eine sichere Mindesthöhe */
      iframe.style.height = "1600px";
    }
  }

  iframe.addEventListener("load", resizeIframe);
})();