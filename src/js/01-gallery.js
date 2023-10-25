import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('ul.gallery');

const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join('');

galleryEl.insertAdjacentHTML('afterbegin', galleryMarkup);

galleryEl.addEventListener('click', onGalleryElClick);

function onGalleryElClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${e.target.getAttribute('data-source')}" >
`);

  instance.show((e) => {
    document.addEventListener('keydown', onEscClose);
  });

  function onEscClose(e) {
    if (e.code === 'Escape') {
      instance.close((e) => {
        document.removeEventListener('keydown', onEscClose);
      });
    }
  }
}
