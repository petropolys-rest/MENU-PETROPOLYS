const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.querySelector('.close-lightbox');
const openers = document.querySelectorAll('[data-open]');
const menuToggle = document.querySelector('.menu-toggle');
const topNav = document.getElementById('topNav');

openers.forEach((item) => {
  item.addEventListener('click', () => {
    const src = item.getAttribute('data-open');
    const title = item.getAttribute('data-title') || 'Vista ampliada';
    lightboxImage.src = src;
    lightboxTitle.textContent = title;
    if (typeof lightbox.showModal === 'function') {
      lightbox.showModal();
    }
  });
});

closeLightbox?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  const box = lightbox.querySelector('.lightbox-box');
  const rect = box.getBoundingClientRect();
  const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  if (!inside) lightbox.close();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.open) lightbox.close();
});

menuToggle?.addEventListener('click', () => {
  const isOpen = topNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

topNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    topNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const ORDER_TEXT = encodeURIComponent('Hola, quiero hacer un pedido en Café Petropolys. 🍽️');
const day = {
  phone: '9992249678',
  label: '999 224 9678',
  start: 6,
  end: 18,
  message: 'En este momento los pedidos se atienden con el número de día.'
};
const night = {
  phone: '9995463816',
  label: '999 546 3816',
  start: 18,
  end: 6,
  message: 'En este momento los pedidos se atienden con el número de noche.'
};

function getMeridaHour() {
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'America/Merida'
  }).formatToParts(new Date());
  const hourPart = parts.find((part) => part.type === 'hour');
  return Number(hourPart?.value || 12);
}

function activeOrderConfig() {
  const hour = getMeridaHour();
  return hour >= day.start && hour < day.end ? day : night;
}

function setDynamicOrders() {
  const config = activeOrderConfig();
  const href = `https://wa.me/52${config.phone}?text=${ORDER_TEXT}`;

  document.querySelectorAll('[data-order-dynamic]').forEach((link) => {
    link.href = href;
  });

  const text = document.getElementById('orderNowText');
  if (text) {
    text.textContent = `${config.message} (${config.label})`;
  }

  const dayCard = document.getElementById('orderDay');
  const nightCard = document.getElementById('orderNight');
  dayCard?.classList.toggle('active', config.phone === day.phone);
  nightCard?.classList.toggle('active', config.phone === night.phone);
}

setDynamicOrders();
