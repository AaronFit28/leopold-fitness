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
    showTestimonial(tIdx);
    setInterval(() => {
      tIdx = (tIdx + 1) % testimonials.length;
      showTestimonial(tIdx);
    }, 5000);
  
    // 4. Initialize Particles.js
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#ff4081' },
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
  
    // 5. Animated Stat Counters
    function animateCount(el, end) {
      let start = 0;
      const stepTime = Math.abs(Math.floor(2000 / end));
      const timer = setInterval(() => {
        el.textContent = ++start;
        if (start === end) clearInterval(timer);
      }, stepTime);
    }
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(document.getElementById('clients-count'), 150);
          animateCount(document.getElementById('lbs-count'), 200);
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

    // Toggle menu (social links) dropdown
    const menuBtn = document.querySelector('.header-nav .menu-item > button');
    menuBtn.addEventListener('click', e => {
      e.currentTarget.parentElement.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.header-nav .menu-item')) {
        document.querySelector('.header-nav .menu-item.open')?.classList.remove('open');
      }
    });
  });