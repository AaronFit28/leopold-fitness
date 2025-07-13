// ----- Dynamic marquee duplication & timing -----
function setupMarquee() {
  const track = document.querySelector('.photo-marquee');
  if (!track) return;

  // Duplicate items once for seamless scroll
  track.innerHTML += track.innerHTML;

  // Calculate scroll distance (half of duplicated width) & duration
  const gap = parseInt(getComputedStyle(track).gap) || 0;   // NEW
  const distance = track.scrollWidth / 2 - gap;             // NEW
  const speed    = 10;                     // px per second
  const duration = distance / speed;        // seconds

  // Expose as CSS variables read by keyframes
  track.style.setProperty('--marquee-distance', `${distance}px`);
  track.style.setProperty('--marquee-duration', `${duration}s`);
}
window.addEventListener('load', setupMarquee);

window.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Accordion Toggle
    document.querySelectorAll('.faq-item h4').forEach(header => {
      header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        body.style.maxHeight = body.style.maxHeight ? null : body.scrollHeight + 'px';
      });
    });
  
    // 2. Scroll‑Reveal for Sections
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('header, section').forEach(el => revealObserver.observe(el));
  
    // 3. Testimonial Quote Box Rotate
    let tIdx = 0;
    const testimonials = document.querySelectorAll('.testimonial-box');
    function showTestimonial(i) {
      testimonials.forEach((t, j) => {
        t.classList.toggle('active', j === i);
      });
    }
    // delay first reveal slightly so the slide‑in animation runs
    setTimeout(() => {
      showTestimonial(tIdx);
    }, 100);
    setInterval(() => {
      tIdx = (tIdx + 1) % testimonials.length;
      showTestimonial(tIdx);
    }, 5000);
  
    // 4. Initialize Particles.js
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#fc0303' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 }, size: { value: 3 },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2 }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  
    // ---- Animated counter with adjustable duration ----
    function animateCount(el, end, duration = 2000) {
      let start = 0;
      const frame = 20;                         // ms between UI updates (~50 fps)
      const steps = Math.ceil(duration / frame);
      const increment = Math.ceil(end / steps); // amount added each tick

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        el.textContent = start.toLocaleString();
      }, frame);
    }
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(document.getElementById('exp-count'), 60, 5000);        // clients – keep 2 s
          animateCount(document.getElementById('follower-count'), 11000, 3000); // followers – ~0.8 s
          statsObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    statsObs.observe(document.getElementById('stats'));
  
    // 6. Parallax Effect on Header Background
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      header.style.backgroundPositionY = `${window.pageYOffset * 0.5}px`;
    });
  
    // 7. Dark/Light Theme Toggle
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      toggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
  
  });