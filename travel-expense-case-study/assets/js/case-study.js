(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-site-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const primaryNav = document.querySelector('[data-primary-nav]');
  const caseNav = document.querySelector('[data-case-nav]');
  const backToTop = document.querySelector('[data-back-to-top]');
  const yearNode = document.querySelector('[data-current-year]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    if (!menuToggle || !primaryNav) return;

    menuToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
    body.classList.remove('menu-open');

    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  };

  const openMenu = () => {
    if (!menuToggle || !primaryNav) return;

    menuToggle.setAttribute('aria-expanded', 'true');
    primaryNav.classList.add('is-open');
    body.classList.add('menu-open');

    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    }
  };

  if (menuToggle && primaryNav) {
    body.classList.add('js-nav-ready');

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const wasOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        closeMenu();
        if (wasOpen) menuToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  const updateScrollUI = () => {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
    }

    if (backToTop) {
      backToTop.classList.toggle('is-visible', y > 700);
    }
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const revealNodes = Array.from(document.querySelectorAll('.reveal'));

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  } else {
    body.classList.add('js-reveal-ready');

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08
      }
    );

    revealNodes.forEach((node) => revealObserver.observe(node));
  }

  if (caseNav && 'IntersectionObserver' in window) {
    const links = Array.from(caseNav.querySelectorAll('a[href^="#"]'));
    const linkById = new Map(
      links.map((link) => [link.getAttribute('href').slice(1), link])
    );
    const sections = Array.from(document.querySelectorAll('[data-section]'));

    const activateLink = (sectionId) => {
      links.forEach((link) => {
        const active = link === linkById.get(sectionId);
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });

      const activeLink = linkById.get(sectionId);
      if (activeLink) {
        activeLink.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) activateLink(visible[0].target.id);
      },
      {
        rootMargin: '-32% 0px -55% 0px',
        threshold: [0.05, 0.15, 0.35, 0.65]
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    links.forEach((link) => {
      link.addEventListener('click', () => {
        const id = link.getAttribute('href').slice(1);
        activateLink(id);
      });
    });
  }
})();
