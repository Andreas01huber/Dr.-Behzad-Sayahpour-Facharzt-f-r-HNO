// ===============================
// MOBILE MENU
// ===============================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Menü schließen wenn Link geklickt wird
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}


// ===============================
// IMMER BEIM LADEN GANZ NACH OBEN
// ===============================
window.addEventListener('load', () => {

  // verhindert Springen zu Anchor beim Reload
  if (window.location.hash) {
    history.replaceState(
      null,
      null,
      window.location.pathname + window.location.search
    );
  }

  // garantiert ganz oben
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });

});


// ===============================
// HOME + LOGO → IMMER NACH OBEN
// ===============================
document.querySelectorAll('a[href="#top"], a[href="#home"], .logo')
.forEach((element) => {

  element.addEventListener('click', (e) => {

    e.preventDefault();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    nav?.classList.remove('open');

  });

});


// ===============================
// LIGHTBOX GALERIE
// ===============================
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const closeButton = lightbox?.querySelector('.lightbox-close');

function closeLightbox() {

  if (!lightbox) return;

  lightbox.classList.remove('active');

  if (lightboxImage) {
    lightboxImage.src = '';
  }

  lightbox.setAttribute('aria-hidden', 'true');

}

document.querySelectorAll('.gallery-item').forEach((item) => {

  item.addEventListener('click', () => {

    const imageUrl = item.getAttribute('data-full');

    if (!imageUrl || !lightbox || !lightboxImage) return;

    lightboxImage.src = imageUrl;

    lightbox.classList.add('active');

    lightbox.setAttribute('aria-hidden', 'false');

  });

});

closeButton?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', (event) => {

  if (event.target === lightbox) {
    closeLightbox();
  }

});

document.addEventListener('keydown', (event) => {

  if (event.key === 'Escape') {
    closeLightbox();
  }

});
