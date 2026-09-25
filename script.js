/* ToDone Landing Page — Interactions */

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => observer.observe(el));

// Animate stat counters in hero visual
const statValues = document.querySelectorAll('.hvs-value[data-count]');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statValues.forEach((el) => {
          const target = parseFloat(el.dataset.count);
          const isFloat = target % 1 !== 0;
          const duration = 1200;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = isFloat ? current.toFixed(1) : Math.round(current);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        });
      }
    });
  },
  { threshold: 0.5 }
);

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) statsObserver.observe(heroVisual);

// Animate timeline bars in two-col-visual when visible
const tvBars = document.querySelectorAll('.tv-bar:not(.tv-placeholder)');
let tvAnimated = false;

const tvObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !tvAnimated) {
        tvAnimated = true;
        tvBars.forEach((bar, i) => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100 + i * 80);
        });
      }
    });
  },
  { threshold: 0.3 }
);

const timelineVisual = document.querySelector('.timeline-visual');
if (timelineVisual) tvObserver.observe(timelineVisual);

// Smooth nav scroll with offset
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 64;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Parallax tilt on hero visual card (subtle)
const heroCard = document.querySelector('.hero-visual-card');
if (heroCard && window.matchMedia('(hover: hover)').matches) {
  const visualContainer = document.querySelector('.hero-visual');
  visualContainer.addEventListener('mousemove', (e) => {
    const rect = visualContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform = `perspective(1200px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
  });
  visualContainer.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(1200px) rotateY(0) rotateX(0)';
  });
  heroCard.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1)';
}

// Subtle hero slot hover lift
document.querySelectorAll('.ht-slot').forEach((slot) => {
  slot.addEventListener('mouseenter', () => {
    slot.style.transform = 'translateY(-2px) scale(1.02)';
    slot.style.zIndex = '2';
  });
  slot.addEventListener('mouseleave', () => {
    slot.style.transform = '';
    slot.style.zIndex = '';
  });
});
