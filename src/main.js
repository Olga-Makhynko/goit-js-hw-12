import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  waitForImagesToLoad,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = input.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  const data = await getImagesByQuery(currentQuery, currentPage).catch(() => {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    return null;
  });

  hideLoader();

  if (!data || !data.hits.length) {
    iziToast.info({
      message: `Sorry, there are no images matching "${currentQuery}". Please try again!`,
      position: 'topRight',
    });
    return;
  }

  createGallery(data.hits);
  await waitForImagesToLoad();

  const totalPages = Math.ceil(data.totalHits / perPage);
  if (currentPage < totalPages) {
    showLoadMoreButton();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  const data = await getImagesByQuery(currentQuery, currentPage).catch(() => {
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
    });
    return null;
  });

  hideLoader();

  if (!data || !data.hits.length) {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    return;
  }

  createGallery(data.hits);
  await waitForImagesToLoad();

  const totalPages = Math.ceil(data.totalHits / perPage);
  if (currentPage < totalPages) {
    showLoadMoreButton();
  } else {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }

  const card = document.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
});
