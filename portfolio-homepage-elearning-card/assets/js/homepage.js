(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-site-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const primaryNav = document.querySelector('[data-primary-nav]');
  const backToTop = document.querySelector('[data-back-to-top]');
  const yearNode = document.querySelector('[data-current-year]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const navLinks = primaryNav
    ? Array.from(primaryNav.querySelectorAll('a[href^="#"]'))
    : [];

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuToggle || !primaryNav) return;

    menuToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
    body.classList.remove('menu-open');

    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }

    if (restoreFocus) menuToggle.focus();
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

    const firstLink = navLinks[0];
    if (firstLink) {
      window.requestAnimationFrame(() => firstLink.focus());
    }
  };

  if (menuToggle && primaryNav) {
    body.classList.add('js-nav-ready');

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu({ restoreFocus: true });
      else openMenu();
    });

    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const wasOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      closeMenu({ restoreFocus: wasOpen });
    });

    document.addEventListener('pointerdown', (event) => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (!isOpen || !header) return;
      if (!header.contains(event.target)) closeMenu();
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

  if ('IntersectionObserver' in window && navLinks.length) {
    const sectionById = new Map(
      navLinks.map((link) => [link.getAttribute('href').slice(1), link])
    );
    const sections = Array.from(document.querySelectorAll('[data-home-section]'));

    const activateNavLink = (sectionId) => {
      navLinks.forEach((link) => {
        const active = link === sectionById.get(sectionId);
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) activateNavLink(visible[0].target.id);
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.05, 0.2, 0.45]
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }


  const carousels = Array.from(document.querySelectorAll('[data-case-carousel]'));

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const tabs = Array.from(carousel.querySelectorAll('[data-carousel-tab]'));
    const previousButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const currentNode = carousel.querySelector('[data-carousel-current]');
    const totalNode = carousel.querySelector('[data-carousel-total]');
    const statusNode = carousel.querySelector('[data-carousel-status]');
    const viewport = carousel.querySelector('[data-carousel-viewport]');

    if (!slides.length || slides.length !== tabs.length) return;

    body.classList.add('js-carousel-ready');

    if (totalNode) {
      totalNode.textContent = String(slides.length);
    }

    let activeIndex = Math.max(
      0,
      slides.findIndex((slide) => slide.classList.contains('is-active'))
    );

    const normalizeIndex = (index) =>
      (index + slides.length) % slides.length;

    const showSlide = (
      requestedIndex,
      { focusTab = false, announce = true } = {}
    ) => {
      activeIndex = normalizeIndex(requestedIndex);

      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.hidden = !isActive;
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      tabs.forEach((tab, index) => {
        const isActive = index === activeIndex;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      if (currentNode) {
        currentNode.textContent = String(activeIndex + 1);
      }

      if (statusNode && announce) {
        const title = slides[activeIndex].dataset.slideTitle || 'case study';
        statusNode.textContent = `Showing ${activeIndex + 1} of ${slides.length}: ${title}`;
      }

      if (focusTab) {
        tabs[activeIndex].focus();
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => showSlide(index));
    });

    const tablist = carousel.querySelector('[role="tablist"]');
    if (tablist) {
      tablist.addEventListener('keydown', (event) => {
        const supportedKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (!supportedKeys.includes(event.key)) return;

        event.preventDefault();

        if (event.key === 'Home') {
          showSlide(0, { focusTab: true });
          return;
        }

        if (event.key === 'End') {
          showSlide(slides.length - 1, { focusTab: true });
          return;
        }

        const direction = event.key === 'ArrowRight' ? 1 : -1;
        showSlide(activeIndex + direction, { focusTab: true });
      });
    }

    if (previousButton) {
      previousButton.addEventListener('click', () => showSlide(activeIndex - 1));
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => showSlide(activeIndex + 1));
    }

    if (viewport) {
      let pointerStartX = null;

      viewport.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse') return;
        pointerStartX = event.clientX;
      });

      viewport.addEventListener('pointerup', (event) => {
        if (pointerStartX === null || event.pointerType === 'mouse') return;

        const distance = event.clientX - pointerStartX;
        pointerStartX = null;

        if (Math.abs(distance) < 48) return;
        showSlide(activeIndex + (distance < 0 ? 1 : -1));
      });

      viewport.addEventListener('pointercancel', () => {
        pointerStartX = null;
      });
    }

    showSlide(activeIndex, { announce: false });
  });

})();
