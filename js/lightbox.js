// CS 506 · Week 3 Starter · Lightbox
// A small image-overlay feature, ~40 lines of vanilla JavaScript.
// Four concepts on display: DOM, events, state, security.

// ── DOM refs (cached once at load time) ─────────────────────────────────
const lb       = document.querySelector('#js-lightbox');
const lbImg    = lb.querySelector('.lightbox__img');
const lbCap    = lb.querySelector('.lightbox__caption');
const thumbs   = document.querySelectorAll('.gallery__thumb');

// ── State ───────────────────────────────────────────────────────────────
const state = {
  isOpen: false,
  index: 0,
  images: [
    { src: 'images/Sis/Sis_BirthdayCake.jpg', caption: 'Lorraine — Birthday celebration.' },
    { src: 'images/Sis/Sis_LisaPhotobooth_01.jpeg', caption: 'Lorraine — Photo booth fun.' },
    { src: 'images/Sis/SisWithDutchy.jpg', caption: 'Lorraine — With Dutchy.' },
    { src: 'images/Sis/Sis_LisaPhotobooth_02.jpeg', caption: 'Lorraine — Peace and smiles.' },
    { src: 'images/Sis/Sis_WhiteFlowers.jpeg', caption: 'Lorraine — At the flower field.' },
  ],
};

// ── Mutators ────────────────────────────────────────────────────────────
function openLightbox(i) {
  state.isOpen = true;
  state.index = i;
  render();
}

function closeLightbox() {
  state.isOpen = false;
  render();
}

// ── Render (state → DOM) ────────────────────────────────────────────────
function render() {
  if (state.isOpen) {
    const { src, caption } = state.images[state.index];
    lbImg.setAttribute('src', src);
    lbCap.textContent = caption;
    lb.classList.add('open');
  } else {
    lb.classList.remove('open');
  }
}

// ── Event listeners ─────────────────────────────────────────────────────
thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => openLightbox(i));
});

lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});

// Close button listener
const closeBtn = lb.querySelector('.lightbox__close');
if (closeBtn) {
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeLightbox();
  });
}

// Backdrop listener
const backdrop = lb.querySelector('.lightbox__backdrop');
if (backdrop) {
  backdrop.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.isOpen) closeLightbox();
});
