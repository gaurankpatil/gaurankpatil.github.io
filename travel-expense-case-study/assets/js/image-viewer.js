/*
 * Progressive image viewer for portfolio screenshots.
 * Ordinary image links remain usable when JavaScript or <dialog> is unavailable.
 */
(() => {
  "use strict";

  const dialog = document.getElementById("portfolio-image-viewer");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const title = document.getElementById("portfolio-image-viewer-title");
  const image = document.getElementById("portfolio-image-viewer-image");
  const viewport = document.getElementById("portfolio-image-viewer-viewport");
  const canvas = document.getElementById("portfolio-image-viewer-canvas");
  const status = document.getElementById("portfolio-image-viewer-status");
  const scaleOutput = document.getElementById("portfolio-image-viewer-scale");
  const originalLink = document.getElementById("portfolio-image-viewer-original");
  const closeButton = dialog.querySelector("[data-viewer-close]");
  const zoomInButton = dialog.querySelector("[data-viewer-zoom-in]");
  const zoomOutButton = dialog.querySelector("[data-viewer-zoom-out]");
  const fitButton = dialog.querySelector("[data-viewer-fit]");
  const actualButton = dialog.querySelector("[data-viewer-actual]");

  if ([title, image, viewport, canvas, status, scaleOutput, originalLink,
    closeButton, zoomInButton, zoomOutButton, fitButton, actualButton]
    .some((element) => !element)) return;

  const zoomButtons = [zoomInButton, zoomOutButton, fitButton, actualButton];
  const lockClass = "portfolio-image-viewer-open";
  const maxScale = 2;
  const step = 0.25;
  const epsilon = 0.001;
  let opener = null;
  let loader = null;
  let requestId = 0;
  let loaded = false;
  let naturalWidth = 0;
  let naturalHeight = 0;
  let scale = 1;
  let fitMode = true;
  let center = { x: 0.5, y: 0.5 };
  let backdropPressed = false;
  let resizeFrame = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function fitScale() {
    const styles = getComputedStyle(viewport);
    const width = viewport.clientWidth
      - (parseFloat(styles.paddingLeft) || 0)
      - (parseFloat(styles.paddingRight) || 0);
    const height = viewport.clientHeight
      - (parseFloat(styles.paddingTop) || 0)
      - (parseFloat(styles.paddingBottom) || 0);
    return Math.min(1, Math.max(1, width) / naturalWidth,
      Math.max(1, height) / naturalHeight);
  }

  function viewportCenter() {
    const rect = viewport.getBoundingClientRect();
    return {
      x: rect.left + viewport.clientLeft + viewport.clientWidth / 2,
      y: rect.top + viewport.clientTop + viewport.clientHeight / 2
    };
  }

  function readCenter() {
    const rect = image.getBoundingClientRect();
    if (!rect.width || !rect.height) return { x: 0.5, y: 0.5 };
    const middle = viewportCenter();
    return {
      x: clamp((middle.x - rect.left) / rect.width, 0, 1),
      y: clamp((middle.y - rect.top) / rect.height, 0, 1)
    };
  }

  function moveToCenter(point) {
    const rect = image.getBoundingClientRect();
    const middle = viewportCenter();
    // Real image dimensions create scrollable space; no transform can hide an edge.
    viewport.scrollLeft += rect.left + rect.width * point.x - middle.x;
    viewport.scrollTop += rect.top + rect.height * point.y - middle.y;
    center = readCenter();
  }

  function updateControls() {
    for (const button of zoomButtons) button.disabled = !loaded;
    if (!loaded) {
      scaleOutput.textContent = "—";
      fitButton.setAttribute("aria-pressed", "false");
      actualButton.setAttribute("aria-pressed", "false");
      return;
    }
    zoomInButton.disabled = scale >= maxScale - epsilon;
    zoomOutButton.disabled = scale <= fitScale() + epsilon;
    fitButton.setAttribute("aria-pressed", String(fitMode));
    actualButton.setAttribute("aria-pressed", String(!fitMode && Math.abs(scale - 1) < epsilon));
    const percent = (scale * 100).toFixed(scale < 0.1 ? 1 : 0);
    scaleOutput.textContent = fitMode ? `Fit (${percent}%)` : `${percent}%`;
  }

  function applyScale(nextScale, shouldFit, point = readCenter()) {
    if (!loaded || !dialog.open) return;
    fitMode = shouldFit;
    scale = shouldFit ? fitScale() : clamp(nextScale, fitScale(), maxScale);
    const width = Math.max(1, Math.floor(naturalWidth * scale));
    const height = Math.max(1, Math.floor(naturalHeight * scale));
    image.style.width = `${width}px`;
    image.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    moveToCenter(shouldFit ? { x: 0.5, y: 0.5 } : point);
    updateControls();
  }

  function stopLoading() {
    if (!loader) return;
    loader.onload = null;
    loader.onerror = null;
    loader.removeAttribute("src");
    loader = null;
  }

  function resetImage() {
    loaded = false;
    naturalWidth = 0;
    naturalHeight = 0;
    image.hidden = true;
    image.removeAttribute("src");
    image.style.width = "";
    image.style.height = "";
    canvas.style.width = "";
    canvas.style.height = "";
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;
    center = { x: 0.5, y: 0.5 };
    updateControls();
  }

  function openViewer(trigger) {
    if (dialog.open) return false;
    stopLoading();
    resetImage();
    const currentRequest = ++requestId;
    const thumbnail = trigger.querySelector("img");
    const heading = trigger.dataset.imageTitle || thumbnail?.alt || "Design preview";
    const source = trigger.href;
    opener = trigger;
    title.textContent = heading;
    image.alt = thumbnail?.alt || heading;
    image.draggable = false;
    originalLink.href = source;
    status.textContent = "Loading image…";
    viewport.setAttribute("aria-busy", "true");

    try {
      dialog.showModal();
    } catch {
      // Preserve the ordinary image-link action if the browser cannot open it.
      viewport.setAttribute("aria-busy", "false");
      opener = null;
      return false;
    }

    document.documentElement.classList.add(lockClass);
    document.body.classList.add(lockClass);
    closeButton.focus({ preventScroll: true });

    const pending = new Image();
    loader = pending;
    pending.decoding = "async";
    pending.onload = () => {
      if (currentRequest !== requestId || !dialog.open) return;
      if (!pending.naturalWidth || !pending.naturalHeight) {
        pending.onerror();
        return;
      }
      naturalWidth = pending.naturalWidth;
      naturalHeight = pending.naturalHeight;
      image.src = source;
      image.hidden = false;
      loaded = true;
      viewport.setAttribute("aria-busy", "false");
      status.textContent = "";
      applyScale(1, true);
    };
    pending.onerror = () => {
      if (currentRequest !== requestId || !dialog.open) return;
      resetImage();
      viewport.setAttribute("aria-busy", "false");
      status.textContent = "This image could not be loaded. Try Open original, or close the viewer and continue reading.";
    };
    pending.src = source;
    return true;
  }

  for (const trigger of document.querySelectorAll("a[data-image-viewer]")) {
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-controls", dialog.id);
  }

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0
      || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const trigger = event.target instanceof Element
      ? event.target.closest("a[data-image-viewer]") : null;
    if (trigger && openViewer(trigger)) event.preventDefault();
  });

  closeButton.addEventListener("click", () => dialog.close());
  zoomInButton.addEventListener("click", () => applyScale(scale + step, false));
  zoomOutButton.addEventListener("click", () => applyScale(scale - step, false));
  fitButton.addEventListener("click", () => applyScale(1, true));
  actualButton.addEventListener("click", () => applyScale(1, false));

  function outsideDialog(event) {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom;
  }

  dialog.addEventListener("pointerdown", (event) => {
    backdropPressed = event.button === 0 && event.target === dialog && outsideDialog(event);
  });
  dialog.addEventListener("pointercancel", () => { backdropPressed = false; });
  dialog.addEventListener("click", (event) => {
    const dismiss = backdropPressed && event.target === dialog && outsideDialog(event);
    backdropPressed = false;
    if (dismiss) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    if (event.key === "Tab") {
      const focusable = [...dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]'
      )].filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }

    if (!loaded || event.target instanceof HTMLElement && event.target.isContentEditable) return;
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      applyScale(scale + step, false);
    } else if (event.key === "-") {
      event.preventDefault();
      applyScale(scale - step, false);
    } else if (event.key === "0") {
      event.preventDefault();
      applyScale(1, true);
    }
    // Escape uses the native modal-dialog close behaviour.
  });

  viewport.addEventListener("scroll", () => {
    if (loaded && dialog.open) center = readCenter();
  }, { passive: true });

  function scheduleResize() {
    if (!dialog.open || !loaded || resizeFrame) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      if (!dialog.open || !loaded) return;
      if (fitMode) applyScale(1, true);
      else {
        moveToCenter(center);
        updateControls();
      }
    });
  }

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(scheduleResize).observe(viewport);
  }
  window.addEventListener("resize", scheduleResize);

  dialog.addEventListener("close", () => {
    // A queued close event must not reset a newly reopened viewer.
    if (dialog.open) return;
    ++requestId;
    stopLoading();
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    resizeFrame = 0;
    backdropPressed = false;
    document.documentElement.classList.remove(lockClass);
    document.body.classList.remove(lockClass);
    viewport.setAttribute("aria-busy", "false");
    resetImage();
    status.textContent = "";
    const previous = opener;
    opener = null;
    if (previous?.isConnected) previous.focus({ preventScroll: true });
  });

  updateControls();
})();
