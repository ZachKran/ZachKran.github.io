// Reveal .fade-in sections on scroll (same pattern you used on index)
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".fade-in");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  els.forEach((el) => io.observe(el));
});
