document.addEventListener("DOMContentLoaded", () => {

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Live clock in header
  const clockEl = document.getElementById("live-clock");
  if (clockEl) {
    const formatter = new Intl.DateTimeFormat(undefined, {
      weekday: "short", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit"
    });
    const tick = () => { clockEl.textContent = formatter.format(new Date()); };
    tick();
    setInterval(tick, 1000 * 30);
  }

  // Active dock item tracking based on section in view
  const sections = ["about", "skills", "work", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const dockLinks = Array.from(document.querySelectorAll(".dock-item"));

  if (sections.length && dockLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          dockLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }

  // One-time pipeline draw-in animation when it scrolls into view
  const pipelinePath = document.getElementById("pipeline-path");
  const pipelineSection = document.querySelector(".pipeline");
  if (pipelinePath && pipelineSection && "IntersectionObserver" in window) {
    const pipelineObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pipelinePath.classList.add("draw");
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    pipelineObserver.observe(pipelineSection);
  } else if (pipelinePath) {
    pipelinePath.classList.add("draw");
  }

  // Friendly note for placeholder links (CV + platform profiles)
  document.querySelectorAll('[data-empty="true"]').forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Add your real link here — this is a placeholder in the template.");
    });
  });

});
