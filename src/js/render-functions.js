import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function waitForImagesToLoad() {
  const images = document.querySelectorAll('.gallery img');
  const totalImages = images.length;
  let loadedImages = 0;

  return new Promise(resolve => {
    images.forEach(image => {
      image.addEventListener('load', () => {
        loadedImages += 1;
        if (loadedImages === totalImages) {
          resolve();
        }
      });
    });
  });
}

export function createGallery(images) {
  const galleryList = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </a>
            <div class="info">
              <p> ${likes}</p>
              <p> ${views}</p>
              <p> ${comments}</p>
              <p> ${downloads}</p>
            </div>
          </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryList);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('visible');
}

export function hideLoader() {
  loader.classList.remove('visible');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
