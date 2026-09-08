(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-site-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const primaryNav = document.querySelector('[data-primary-nav]');
  const caseNav = document.querySelector('[data-case-nav]');
  const backToTop = document.querySelector('[data-back-to-top]');
  const yearNode = document.querySelector('[data-current-year]');
  const imageDialog = document.querySelector('[data-image-dialog]');
  const dialogImage = imageDialog?.querySelector('[data-dialog-image]');
  const dialogCaption = imageDialog?.querySelector('[data-dialog-caption]');
  const dialogClose = imageDialog?.querySelector('[data-dialog-close]');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastDialogTrigger = null;

  const prefersReducedMotion = () => reducedMotionQuery.matches;

  const getPrimaryNavLinks = () => (
    primaryNav ? Array.from(primaryNav.querySelectorAll('a[href]')) : []
  );

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

    const firstLink = getPrimaryNavLinks()[0];
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

      const menuWasOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      closeMenu({ restoreFocus: menuWasOpen && !imageDialog?.open });
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
    const scrollPosition = window.scrollY;

    if (header) {
      header.classList.toggle('is-scrolled', scrollPosition > 8);
    }

    if (backToTop) {
      backToTop.classList.toggle('is-visible', scrollPosition > 700);
    }
  };

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });
  }

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const revealNodes = Array.from(document.querySelectorAll('.reveal'));

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
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

    const activateLink = (sectionId, shouldScrollNavigation = true) => {
      links.forEach((link) => {
        const isActive = link === linkById.get(sectionId);
        link.classList.toggle('is-active', isActive);

        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });

      const activeLink = linkById.get(sectionId);
      if (activeLink && shouldScrollNavigation) {
        activeLink.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections[0]) {
          activateLink(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: '-32% 0px -55% 0px',
        threshold: [0.05, 0.15, 0.35, 0.65]
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    links.forEach((link) => {
      link.addEventListener('click', () => {
        const sectionId = link.getAttribute('href').slice(1);
        activateLink(sectionId, false);
      });
    });
  }

  const restoreDialogFocus = () => {
    if (lastDialogTrigger instanceof HTMLElement) {
      lastDialogTrigger.focus();
    }
    lastDialogTrigger = null;
  };

  const closeImageDialog = () => {
    if (!imageDialog?.open) return;
    imageDialog.close();
  };

  if (
    imageDialog &&
    dialogImage &&
    dialogCaption &&
    typeof imageDialog.showModal === 'function'
  ) {
    const zoomLinks = Array.from(document.querySelectorAll('[data-zoom-link]'));

    zoomLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        const sourceImage = link.querySelector('img');
        const imageUrl = link.getAttribute('href');
        if (!sourceImage || !imageUrl) return;

        lastDialogTrigger = link;
        dialogImage.src = imageUrl;
        dialogImage.alt = sourceImage.alt || 'Expanded product interface screenshot';
        dialogCaption.textContent = link.dataset.zoomCaption || '';
        body.classList.add('dialog-open');
        imageDialog.showModal();
        dialogClose?.focus();
      });
    });

    dialogClose?.addEventListener('click', closeImageDialog);

    imageDialog.addEventListener('click', (event) => {
      if (event.target === imageDialog) closeImageDialog();
    });

    imageDialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeImageDialog();
    });

    imageDialog.addEventListener('close', () => {
      body.classList.remove('dialog-open');
      dialogImage.removeAttribute('src');
      dialogImage.alt = '';
      dialogCaption.textContent = '';
      restoreDialogFocus();
    });
  }
})();
