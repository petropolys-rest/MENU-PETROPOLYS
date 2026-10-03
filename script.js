"use strict";

// Orders always follow Mérida's local time, including an open tab at shift change.
const ORDER_TEXT = encodeURIComponent(
  "Hola, quiero hacer un pedido en Café Petropolys. 🍽️",
);
const day = {
  phone: "9992249678",
  label: "999 224 9678",
  message: "Turno de día disponible",
};
const night = {
  phone: "9995463816",
  label: "999 546 3816",
  message: "Turno de noche disponible",
};
function activeOrderConfig(date = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Merida",
      hour: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .find((part) => part.type === "hour").value,
  );
  return hour >= 6 && hour < 18 ? day : night;
}
function setDynamicOrders() {
  const config = activeOrderConfig();
  document.querySelectorAll("[data-order-dynamic]").forEach((link) => {
    link.href = `https://wa.me/52${config.phone}?text=${ORDER_TEXT}`;
  });
  document.getElementById("orderNowText").textContent =
    `${config.message} · ${config.label}`;
  [
    ["orderDay", day],
    ["orderNight", night],
  ].forEach(([id, shift]) => {
    const card = document.getElementById(id),
      active = shift === config;
    card.classList.toggle("active", active);
    card.querySelector(".shift-status").textContent = active
      ? "DISPONIBLE AHORA"
      : "OTRO TURNO";
  });
}
setDynamicOrders();
setInterval(setDynamicOrders, 30000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) setDynamicOrders();
});
window.addEventListener("focus", setDynamicOrders);
document
  .querySelectorAll("[data-order-dynamic]")
  .forEach((link) => link.addEventListener("click", setDynamicOrders));

// Let real anchors handle history, keyboard focus, direct URLs and back/forward.
const menuToggle = document.querySelector(".menu-toggle");
const topNav = document.getElementById("topNav");
const header = document.querySelector(".site-header");
function closeMenu() {
  topNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector(".sr-only").textContent = "Abrir navegación";
}
menuToggle.addEventListener("click", () => {
  const open = topNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector(".sr-only").textContent = open
    ? "Cerrar navegación"
    : "Abrir navegación";
});
document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && topNav.classList.contains("is-open")) {
    closeMenu();
    menuToggle.focus();
  }
});
const navLinks = [...topNav.querySelectorAll('a[href^="#"]')];
let ticking = false;
function updateActiveNav() {
  const marker = header.getBoundingClientRect().height + 110;
  let active = "";
  navLinks.forEach((link) => {
    const section = document.getElementById(link.hash.slice(1));
    if (section.getBoundingClientRect().top <= marker) active = link.hash;
  });
  navLinks.forEach((link) => {
    const selected = active === link.hash;
    link.classList.toggle("is-active", selected);
    if (selected) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  ticking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateActiveNav);
    }
  },
  { passive: true },
);
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
  updateActiveNav();
});
updateActiveNav();

// One gesture model for mouse, touch and pen; pinch and drag never compete.
const lightbox = document.getElementById("lightbox");
const frame = document.getElementById("lightboxFrame");
const page = document.getElementById("lightboxPage");
const image = document.getElementById("lightboxImage");
const title = document.getElementById("lightboxTitle");
const counter = document.getElementById("lightboxCounter");
const error = document.getElementById("lightboxError");
const level = document.getElementById("zoomLevel");
const pointers = new Map();
let items = [],
  index = 0,
  zoom = 1,
  panX = 0,
  panY = 0,
  gesture = null,
  trigger = null,
  loadSequence = 0;
function fittedSize() {
  const ratio = Math.min(
    frame.clientWidth / (image.naturalWidth || 1),
    frame.clientHeight / (image.naturalHeight || 1),
  );
  return {
    width: (image.naturalWidth || 1) * ratio,
    height: (image.naturalHeight || 1) * ratio,
  };
}
function applyTransform() {
  const fit = fittedSize();
  const maxX = Math.max(0, (fit.width * zoom - frame.clientWidth) / 2);
  const maxY = Math.max(0, (fit.height * zoom - frame.clientHeight) / 2);
  panX = Math.max(-maxX, Math.min(maxX, panX));
  panY = Math.max(-maxY, Math.min(maxY, panY));
  image.style.setProperty("--zoom", String(zoom));
  image.style.setProperty("--pan-x", `${panX}px`);
  image.style.setProperty("--pan-y", `${panY}px`);
  image.classList.toggle("is-zoomed", zoom > 1.01);
  level.textContent = `${Math.round(zoom * 100)}%`;
}
function applyZoom(nextZoom, clientX, clientY) {
  const next = Math.max(1, Math.min(5, nextZoom));
  // Keep the point under the cursor or pinch midpoint in place when possible.
  if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
    const rect = frame.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2,
      y = clientY - rect.top - rect.height / 2;
    panX = x - (x - panX) * (next / zoom);
    panY = y - (y - panY) * (next / zoom);
  }
  zoom = next;
  if (zoom === 1) {
    panX = 0;
    panY = 0;
  }
  applyTransform();
}
function resetZoom() {
  zoom = 1;
  panX = 0;
  panY = 0;
  applyTransform();
}
function clearGesture() {
  pointers.forEach((_, id) => {
    if (frame.hasPointerCapture(id)) frame.releasePointerCapture(id);
  });
  pointers.clear();
  gesture = null;
  image.classList.remove("is-dragging");
}
function renderLightbox(nextIndex, direction = 0) {
  clearGesture();
  index = (nextIndex + items.length) % items.length;
  const item = items[index],
    sequence = ++loadSequence;
  title.textContent = item.title;
  counter.textContent = `${index + 1} / ${items.length}`;
  error.hidden = true;
  image.alt = item.title;
  image.style.opacity = "0";
  resetZoom();
  page.classList.remove("is-turn-next", "is-turn-prev");
  const reveal = () => {
    if (sequence !== loadSequence) return;
    image.style.opacity = "1";
    applyTransform();
    if (direction) {
      void page.offsetWidth;
      page.classList.add(direction > 0 ? "is-turn-next" : "is-turn-prev");
    }
    // Preload only the next full-size image rather than every menu page.
    const preload = new Image();
    preload.src = items[(index + 1) % items.length].src;
  };
  image.onload = reveal;
  image.onerror = () => {
    if (sequence === loadSequence) {
      error.hidden = false;
      image.style.opacity = "0";
    }
  };
  image.src = item.src;
  if (image.complete && image.naturalWidth) reveal();
}
function openGallery(button) {
  trigger = button;
  const seen = new Set();
  items = [...document.querySelectorAll("[data-open]")]
    .filter((node) => node.dataset.gallery === button.dataset.gallery)
    .filter((node) => {
      if (seen.has(node.dataset.open)) return false;
      seen.add(node.dataset.open);
      return true;
    })
    .map((node) => ({ src: node.dataset.open, title: node.dataset.title }));
  lightbox.showModal();
  document.body.classList.add("modal-open");
  renderLightbox(items.findIndex((item) => item.src === button.dataset.open));
  document.querySelector(".close-lightbox").focus();
}
document
  .querySelectorAll("[data-open]")
  .forEach((button) =>
    button.addEventListener("click", () => openGallery(button)),
  );
function showNext() {
  renderLightbox(index + 1, 1);
}
function showPrev() {
  renderLightbox(index - 1, -1);
}
// Touch controls also work immediately after a swipe, when browsers may suppress
// a compatibility click. Ignore the subsequent click to avoid activating twice.
function bindViewerControl(button, action) {
  let lastTouch = -Infinity;
  button.addEventListener("pointerup", (event) => {
    if (event.pointerType !== "touch" || !event.isPrimary) return;
    const rect = button.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      return;
    lastTouch = performance.now();
    action();
  });
  button.addEventListener("click", (event) => {
    if (event.detail !== 0 && performance.now() - lastTouch < 700) return;
    action();
  });
}
bindViewerControl(document.querySelector(".lightbox-next"), showNext);
bindViewerControl(document.querySelector(".lightbox-prev"), showPrev);
bindViewerControl(document.querySelector(".close-lightbox"), () =>
  lightbox.close(),
);
bindViewerControl(document.getElementById("zoomIn"), () =>
  applyZoom(zoom + 0.5),
);
bindViewerControl(document.getElementById("zoomOut"), () =>
  applyZoom(zoom - 0.5),
);
bindViewerControl(document.getElementById("zoomReset"), resetZoom);
lightbox.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  clearGesture();
  resetZoom();
  trigger?.focus({ preventScroll: true });
});
lightbox.addEventListener("click", (event) => {
  if (event.target !== lightbox) return;
  const rect = lightbox.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    lightbox.close();
});
frame.addEventListener(
  "wheel",
  (event) => {
    if (event.target.closest(".zoom-controls")) return;
    event.preventDefault();
    applyZoom(
      zoom + (event.deltaY < 0 ? 0.2 : -0.2),
      event.clientX,
      event.clientY,
    );
  },
  { passive: false },
);
frame.addEventListener("dblclick", (event) => {
  if (event.target.closest("button,.zoom-controls")) return;
  applyZoom(zoom > 1 ? 1 : 2.5, event.clientX, event.clientY);
});
function geometry() {
  const [a, b] = [...pointers.values()];
  return {
    distance: Math.hypot(b.x - a.x, b.y - a.y),
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}
function beginGesture() {
  if (pointers.size >= 2) {
    const g = geometry();
    gesture = { type: "pinch", ...g, zoom, panX, panY };
  } else if (pointers.size === 1) {
    const p = [...pointers.values()][0];
    gesture = {
      type: "drag",
      x: p.x,
      y: p.y,
      panX,
      panY,
      startZoom: zoom,
      multi: p.multi || false,
    };
  } else gesture = null;
}
frame.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || event.target.closest(".zoom-controls")) return;
  event.preventDefault();
  pointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY,
    multi: false,
  });
  if (pointers.size > 1)
    pointers.forEach((p) => {
      p.multi = true;
    });
  frame.setPointerCapture(event.pointerId);
  beginGesture();
  image.classList.toggle("is-dragging", zoom > 1);
});
frame.addEventListener("pointermove", (event) => {
  if (!pointers.has(event.pointerId)) return;
  const p = pointers.get(event.pointerId);
  p.x = event.clientX;
  p.y = event.clientY;
  if (!gesture) return;
  if (gesture.type === "pinch" && pointers.size >= 2) {
    const g = geometry(),
      rect = frame.getBoundingClientRect();
    zoom = Math.max(
      1,
      Math.min(5, (gesture.zoom * g.distance) / Math.max(1, gesture.distance)),
    );
    const originX = gesture.x - rect.left - rect.width / 2,
      originY = gesture.y - rect.top - rect.height / 2;
    panX =
      g.x -
      rect.left -
      rect.width / 2 -
      (originX - gesture.panX) * (zoom / gesture.zoom);
    panY =
      g.y -
      rect.top -
      rect.height / 2 -
      (originY - gesture.panY) * (zoom / gesture.zoom);
    applyTransform();
  } else if (zoom > 1.01) {
    panX = gesture.panX + p.x - gesture.x;
    panY = gesture.panY + p.y - gesture.y;
    applyTransform();
  }
});
function finishPointer(event) {
  if (!pointers.has(event.pointerId)) return;
  const p = pointers.get(event.pointerId),
    start = gesture;
  const swipe =
    event.type === "pointerup" &&
    pointers.size === 1 &&
    start?.type === "drag" &&
    !p.multi &&
    !start.multi &&
    zoom <= 1.01 &&
    start.startZoom <= 1.01;
  pointers.delete(event.pointerId);
  if (frame.hasPointerCapture(event.pointerId))
    frame.releasePointerCapture(event.pointerId);
  image.classList.remove("is-dragging");
  beginGesture();
  if (swipe) {
    const dx = p.x - start.x,
      dy = p.y - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3)
      dx < 0 ? showNext() : showPrev();
  }
}
frame.addEventListener("pointerup", finishPointer);
frame.addEventListener("pointercancel", finishPointer);
window.addEventListener("blur", clearGesture);
window.addEventListener("resize", () => {
  if (lightbox.open) applyTransform();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const actions = {
    ArrowRight: showNext,
    ArrowLeft: showPrev,
    "+": () => applyZoom(zoom + 0.5),
    "=": () => applyZoom(zoom + 0.5),
    "-": () => applyZoom(zoom - 0.5),
    0: resetZoom,
  };
  if (actions[event.key]) {
    event.preventDefault();
    actions[event.key]();
  }
});
