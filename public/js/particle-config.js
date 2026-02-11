document.addEventListener("DOMContentLoaded", () => {
  if (!window.particlesJS) {
    console.error("particles.js não carregado");
    return;
  }

  particlesJS("particles-js", {
    particles: {
      number: { value: 100 },
      color: { value: "#fcfcfc" },
      size: { value: 3 },
      line_linked: {
        enable: true,
        opacity: 0.2
      },
      move: { speed: 1.5 }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "grab" },
        resize: true
      }
    },
    retina_detect: true
  });
});
