/* ============================================
   NEWFORM EDITORIAL PORTFOLIO — SCRIPT
   Ashish Ranjan — Java Full Stack Developer
   ============================================ */

/* ============================================
   1. PRELOADER
   ============================================ */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Initialize AOS after preloader finishes
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          offset: 60,
          disable: 'mobile',
        });
      }
    }, 600);
  });

  // Fallback: hide after 3s
  setTimeout(() => {
    preloader.classList.add('hidden');
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: 'mobile',
      });
    }
  }, 3000);
})();

/* ============================================
   2. SCROLL PROGRESS
   ============================================ */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function update() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0) {
      bar.style.width = `${(window.scrollY / total) * 100}%`;
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ============================================
   3. NAV HEADER — SCROLL STATE
   ============================================ */
(function () {
  const header = document.getElementById('nav-header');
  const backToTop = document.getElementById('back-to-top');
  if (!header) return;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (backToTop) {
      if (scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

/* ============================================
   4. MOBILE NAV OVERLAY TOGGLE
   ============================================ */
(function () {
  const menuBtn = document.getElementById('nav-menu-btn');
  const overlay = document.getElementById('nav-overlay');
  const closeBtn = document.getElementById('nav-overlay-close');
  const overlayLinks = document.querySelectorAll('.nav-overlay-link');

  if (!menuBtn || !overlay) return;

  // Also wire the ‖ mark button
  const markBtn = document.getElementById('nav-mark-btn');

  function openMenu() {
    overlay.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  if (markBtn) markBtn.addEventListener('click', openMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  overlayLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });
})();

/* ============================================
   5. SCROLL REVEAL — Now handled by AOS library
   ============================================ */
// AOS is initialized in the preloader section above.
// data-aos attributes on HTML elements handle all scroll animations.

/* ============================================
   6. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
})();

/* ============================================
   7. CONTACT FORM — SIMPLE HANDLER
   ============================================ */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('contact-submit');
    if (submitBtn) {
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Message Sent ✓</span>';
      submitBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.pointerEvents = '';
        form.reset();
      }, 2500);
    }
  });
})();

/* ============================================
   8. IMAGE TILES — SUBTLE PARALLAX
   ============================================ */
(function () {
  const tiles = document.querySelectorAll('.hero-image-tile, .project-image-wrap, .about-image');

  if ('ontouchstart' in window || tiles.length === 0) return;

  function handleParallax() {
    tiles.forEach(tile => {
      const rect = tile.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Only process if tile is in viewport
      if (rect.top < viewHeight && rect.bottom > 0) {
        const centerY = rect.top + rect.height / 2;
        const distFromCenter = (centerY - viewHeight / 2) / viewHeight;
        const translateY = distFromCenter * -15; // subtle 15px max parallax

        const img = tile.querySelector('img');
        if (img) {
          img.style.transform = `translateY(${translateY}px) scale(1.02)`;
        }
      }
    });
  }

  window.addEventListener('scroll', handleParallax, { passive: true });
  handleParallax();
})();

/* ============================================
   9. TICK MARK ENTRANCE ANIMATION
   ============================================ */
(function () {
  const ticks = document.querySelectorAll('.tick-mark');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'tickSlideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Add CSS animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    .tick-mark {
      transform: scaleX(0);
      transform-origin: left center;
    }
    @keyframes tickSlideIn {
      to { transform: scaleX(1); }
    }
  `;
  document.head.appendChild(style);

  ticks.forEach(tick => observer.observe(tick));
})();

/* ============================================
   10. 3D GLASSMORPHISM CARD — TILT EFFECT
   ============================================ */
(function () {
  const cards = document.querySelectorAll('[data-tilt]');

  if (cards.length === 0) return;

  cards.forEach(card => {
    const inner = card.querySelector('.glass-card-inner');
    const shine = card.querySelector('.glass-card-shine');
    if (!inner) return;

    const maxTilt = 15; // maximum rotation degrees

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      // Mouse position relative to card center (-0.5 to 0.5)
      const mouseX = (e.clientX - rect.left) / cardWidth - 0.5;
      const mouseY = (e.clientY - rect.top) / cardHeight - 0.5;

      // Calculate rotation (inverted for natural feel)
      const rotateX = -mouseY * maxTilt;
      const rotateY = mouseX * maxTilt;

      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      inner.style.transition = 'transform 0.05s ease-out';

      // Move shine reflection with cursor
      if (shine) {
        const shineX = mouseX * 40;
        const shineY = mouseY * 40;
        shine.style.transform = `translate(${shineX}px, ${shineY}px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
      inner.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';

      if (shine) {
        shine.style.transform = 'translate(0px, 0px)';
        shine.style.transition = 'transform 0.4s ease';
      }
    });

    card.addEventListener('mouseenter', () => {
      inner.style.transition = 'transform 0.1s ease-out';
    });
  });
})();

/* ============================================
   11. PROJECT CARD 3D TILT ON HOVER
   ============================================ */
(function () {
  const projectEntries = document.querySelectorAll('.project-entry');
  if (projectEntries.length === 0) return;

  projectEntries.forEach(entry => {
    const maxTilt = 8; // gentle rotation
    
    // Create glare overlay dynamically
    let glare = entry.querySelector('.glare-overlay');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'glare-overlay';
      glare.style.position = 'absolute';
      glare.style.inset = '0';
      glare.style.pointerEvents = 'none';
      glare.style.borderRadius = 'var(--radius-cards)';
      glare.style.zIndex = '5';
      glare.style.mixBlendMode = 'overlay';
      glare.style.transition = 'opacity 0.3s ease';
      glare.style.opacity = '0';
      entry.style.position = 'relative';
      entry.appendChild(glare);
    }

    entry.addEventListener('mousemove', (e) => {
      const rect = entry.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const mouseX = (e.clientX - rect.left) / w - 0.5;
      const mouseY = (e.clientY - rect.top) / h - 0.5;

      const rotateX = -mouseY * maxTilt;
      const rotateY = mouseX * maxTilt;

      entry.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      entry.style.transition = 'transform 0.08s ease-out';

      glare.style.opacity = '1';
      const percentageX = (e.clientX - rect.left) / w * 100;
      const percentageY = (e.clientY - rect.top) / h * 100;
      glare.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(43, 238, 75, 0.18) 0%, transparent 60%)`;
    });

    entry.addEventListener('mouseleave', () => {
      entry.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      entry.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
      glare.style.opacity = '0';
    });
  });
})();

/* ============================================
   12. CONTACT CARD 3D TILT ON HOVER
   ============================================ */
(function () {
  const contactCard = document.querySelector('.contact-form-wrap');
  if (!contactCard) return;

  const maxTilt = 8;
  
  let glare = contactCard.querySelector('.glare-overlay');
  if (!glare) {
    glare = document.createElement('div');
    glare.className = 'glare-overlay';
    glare.style.position = 'absolute';
    glare.style.inset = '0';
    glare.style.pointerEvents = 'none';
    glare.style.borderRadius = 'inherit';
    glare.style.zIndex = '5';
    glare.style.mixBlendMode = 'overlay';
    glare.style.transition = 'opacity 0.3s ease';
    glare.style.opacity = '0';
    contactCard.style.position = 'relative';
    contactCard.appendChild(glare);
  }

  contactCard.addEventListener('mousemove', (e) => {
    const rect = contactCard.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const mouseX = (e.clientX - rect.left) / w - 0.5;
    const mouseY = (e.clientY - rect.top) / h - 0.5;

    const rotateX = -mouseY * maxTilt;
    const rotateY = mouseX * maxTilt;

    contactCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    contactCard.style.transition = 'transform 0.08s ease-out';

    glare.style.opacity = '1';
    const percentageX = (e.clientX - rect.left) / w * 100;
    const percentageY = (e.clientY - rect.top) / h * 100;
    glare.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(43, 238, 75, 0.2) 0%, transparent 60%)`;
  });

  contactCard.addEventListener('mouseleave', () => {
    contactCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    contactCard.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    glare.style.opacity = '0';
  });
})();

/* ============================================
   13. STICKY SECTIONS CARD STACKING EFFECT
   ============================================ */
(function () {
  const sections = document.querySelectorAll('.sticky-section');
  if (sections.length === 0) return;

  function handleSectionStacking() {
    if (window.innerWidth < 992) {
      // Clean up inline styles on mobile screens
      sections.forEach(sec => {
        const inner = sec.querySelector('.section-inner, .hero-container');
        if (inner) {
          inner.style.transform = '';
          inner.style.opacity = '';
        }
      });
      return;
    }

    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      const inner = sec.querySelector('.section-inner, .hero-container');
      if (!inner) return;
      
      // If the section is scrolled past the top of viewport
      if (rect.top <= 0 && rect.bottom > 0) {
        const progress = Math.abs(rect.top) / rect.height;
        const scale = 1 - progress * 0.05; // scale down 5% max
        const translateY = progress * -20; // translate 20px up max
        const opacity = 1 - progress * 0.25; // fade out 25% max

        inner.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        inner.style.opacity = `${opacity}`;
        inner.style.transformOrigin = 'center top';
        inner.style.transition = 'transform 0.05s ease-out, opacity 0.05s ease-out';
      } else {
        inner.style.transform = '';
        inner.style.opacity = '';
      }
    });
  }

  window.addEventListener('scroll', handleSectionStacking, { passive: true });
  window.addEventListener('resize', handleSectionStacking);
  handleSectionStacking();
})();

/* ============================================
   14. HERO ELEMENTS SCROLL-DRIVEN 3D TILT
   ============================================ */
(function () {
  const headline = document.querySelector('.hero-headline');
  const imageInner = document.querySelector('.hero-image-tile-inner');

  function handleHeroScrollTilt() {
    const scrollY = window.scrollY;
    
    if (scrollY < 800) {
      if (headline) {
        const rotateX = scrollY * 0.035; // up to ~28deg tilt back
        const translateZ = scrollY * -0.12; // slide back in Z-space
        headline.style.transform = `perspective(1200px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
        headline.style.opacity = 1 - scrollY / 600;
      }

      if (imageInner) {
        const rotateX = scrollY * 0.045;
        const rotateY = scrollY * -0.025;
        const translateZ = scrollY * -0.1;
        imageInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
      }
    }
  }

  window.addEventListener('scroll', handleHeroScrollTilt, { passive: true });
  handleHeroScrollTilt();
})();

/* ============================================
   15. ABOUT IMAGE 3D TILT ON HOVER
   ============================================ */
(function () {
  const aboutWrap = document.querySelector('.about-image-wrap');
  if (!aboutWrap) return;

  const maxTilt = 10;
  
  let glare = aboutWrap.querySelector('.glare-overlay');
  if (!glare) {
    glare = document.createElement('div');
    glare.className = 'glare-overlay';
    glare.style.position = 'absolute';
    glare.style.inset = '0';
    glare.style.pointerEvents = 'none';
    glare.style.borderRadius = 'inherit';
    glare.style.zIndex = '5';
    glare.style.mixBlendMode = 'overlay';
    glare.style.transition = 'opacity 0.3s ease';
    glare.style.opacity = '0';
    aboutWrap.style.position = 'relative';
    aboutWrap.appendChild(glare);
  }

  aboutWrap.addEventListener('mousemove', (e) => {
    const rect = aboutWrap.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const mouseX = (e.clientX - rect.left) / w - 0.5;
    const mouseY = (e.clientY - rect.top) / h - 0.5;

    const rotateX = -mouseY * maxTilt;
    const rotateY = mouseX * maxTilt;

    aboutWrap.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    aboutWrap.style.transition = 'transform 0.08s ease-out';

    glare.style.opacity = '1';
    const percentageX = (e.clientX - rect.left) / w * 100;
    const percentageY = (e.clientY - rect.top) / h * 100;
    glare.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(43, 238, 75, 0.2) 0%, transparent 60%)`;
  });

  aboutWrap.addEventListener('mouseleave', () => {
    aboutWrap.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    aboutWrap.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    glare.style.opacity = '0';
  });
})();

