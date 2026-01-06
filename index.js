/* ===============================
   Fade-in on scroll
=============================== */
(function () {
  const fadeEls = document.querySelectorAll(".fade-in");
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeEls.forEach((el) => observer.observe(el));
})();

/* ===============================
   Theme switcher
=============================== */
(function () {
  const root = document.documentElement;
  const dots = document.querySelectorAll(".dot");
  if (!dots.length) return;

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  dots.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTheme(btn.dataset.theme);
    });
  });

  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme || "beige");
})();
/* ===============================
   Website Carousel (3 cards visible, fade/scale)
=============================== */
(function () {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const prevBtn = carousel.querySelector("[data-prev]");
  const nextBtn = carousel.querySelector("[data-next]");
  const dots = Array.from(carousel.querySelectorAll("[data-dot]"));

  let index = 0;
  let timer = null;
  const intervalMs = 3500;

  function updateDots() {
    dots.forEach((d) => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function paint() {
    const n = slides.length;
    const left = (index - 1 + n) % n;
    const right = (index + 1) % n;

    slides.forEach((s, i) => {
      s.classList.remove("is-active", "is-left", "is-right", "is-hidden");

      if (i === index) s.classList.add("is-active");
      else if (i === left) s.classList.add("is-left");
      else if (i === right) s.classList.add("is-right");
      else s.classList.add("is-hidden");
    });

    updateDots();
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    paint();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function start() {
    stop();
    timer = setInterval(next, intervalMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  nextBtn?.addEventListener("click", () => { next(); start(); });
  prevBtn?.addEventListener("click", () => { prev(); start(); });

  dots.forEach((btn) => {
    btn.addEventListener("click", () => {
      goTo(Number(btn.dataset.dot));
      start();
    });
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { next(); start(); }
    if (e.key === "ArrowLeft") { prev(); start(); }
  });

  // Init
  goTo(0);
  start();
})();
