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
// HERO Hintergrund-Slideshow aus der Galerie (alle 5 Sekunden, weiches Fade)
(function () {
  const layerA = document.querySelector(".hero-bg-a");
  const layerB = document.querySelector(".hero-bg-b");
  if (!layerA || !layerB) return;

  // Bilder aus der Galerie holen (data-full nutzen!)
  const galleryButtons = Array.from(document.querySelectorAll(".gallery-item"));
  const images = galleryButtons
    .map((btn) => btn.getAttribute("data-full"))
    .filter(Boolean);

  // Fallback, falls keine Galerie gefunden wird
  if (images.length === 0) {
    images.push("0488-300x198-1.jpg");
  }

  // Preload für flüssigeres Laden
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let index = 0;
  let showA = true;

  // Startbild setzen
  layerA.style.backgroundImage = `url("${images[0]}")`;

  setInterval(() => {
    index = (index + 1) % images.length;
    const nextSrc = images[index];

    if (showA) {
      layerB.style.backgroundImage = `url("${nextSrc}")`;
      layerB.style.opacity = "1";
      layerA.style.opacity = "0";
    } else {
      layerA.style.backgroundImage = `url("${nextSrc}")`;
      layerA.style.opacity = "1";
      layerB.style.opacity = "0";
    }

    showA = !showA;
  }, 5000);
})();
