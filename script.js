/* DJ Crate Library — Interactions & Animations */

(function () {
  'use strict';

  // ─── Scroll Reveal (IntersectionObserver fallback) ───
  const hasNativeScrollAnimations =
    CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

  if (!hasNativeScrollAnimations) {
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      revealElements.forEach((el) => observer.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('visible'));
    }
  }

  // ─── Floating WhatsApp: show after scrolling ───
  const floatBtn = document.getElementById('whatsapp-float-btn');

  if (floatBtn) {
    let ticking = false;

    function updateFloatVisibility() {
      if (window.scrollY > 300) {
        floatBtn.style.opacity = '1';
        floatBtn.style.pointerEvents = 'auto';
        floatBtn.style.transform = 'scale(1)';
      } else {
        floatBtn.style.opacity = '0';
        floatBtn.style.pointerEvents = 'none';
        floatBtn.style.transform = 'scale(0.7)';
      }
      ticking = false;
    }

    floatBtn.style.transition =
      'opacity 0.35s ease, transform 0.35s ease, box-shadow 0.25s ease';
    floatBtn.style.opacity = '0';
    floatBtn.style.pointerEvents = 'none';
    floatBtn.style.transform = 'scale(0.7)';

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(updateFloatVisibility);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // ─── Gallery: pause auto-scroll on hover/touch ───
  const galleryTrack = document.querySelector('.gallery-track');

  if (galleryTrack) {
    galleryTrack.addEventListener('mouseenter', () => {
      galleryTrack.style.animationPlayState = 'paused';
    });
    galleryTrack.addEventListener('mouseleave', () => {
      galleryTrack.style.animationPlayState = 'running';
    });

    // Touch support
    galleryTrack.addEventListener('touchstart', () => {
      galleryTrack.style.animationPlayState = 'paused';
    }, { passive: true });
    galleryTrack.addEventListener('touchend', () => {
      galleryTrack.style.animationPlayState = 'running';
    }, { passive: true });
  }

  // ─── Pricing card: animate on scroll into view ───
  const pricingCard = document.querySelector('.pricing-card');

  if (pricingCard && 'IntersectionObserver' in window) {
    const pricingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            pricingCard.classList.add('in-view');
            pricingObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    pricingObserver.observe(pricingCard);
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
