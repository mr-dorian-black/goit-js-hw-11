import { searchInfo } from './api'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import _ from 'lodash'
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let currentPage = 1;
let isFetching = false;
let hasMore = true;

const {
     elements: { searchQuery }
} = form;

let options = {
     captionsData: 'alt',
     captionDelay: 250,
     disableScroll: true
};

let galleryLightbox = new SimpleLightbox('.gallery a', options);


form.addEventListener('submit', async (event) => {
     event.preventDefault();
     currentPage = 1;
     hasMore = true;
     window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
     });
     await fetchData(searchQuery.value, currentPage);
});

async function fetchData(info, page) {
     isFetching = true;
     try {
          let response = await searchInfo(info, page);
          if (response.data.totalHits === 0) {
               gallery.innerHTML = '';
               Notiflix.Notify.failure(
                    `Sorry, there are no images matching your search query. Please try again.`,
                    {
                         timeout: 4000,
                         useIcon: true
                    },
               );
               hasMore = false;
               isFetching = false;
          }
          else if (response.data.hits.length === 0) {
               Notiflix.Notify.warning(
                    `We're sorry, but you've reached the end of search results.`,
                    {
                         timeout: 4000,
                         useIcon: true
                    },
               );
               hasMore = false;
               isFetching = false;
          }
          else {
               let markup = await renderData(response.data.hits);
               if (page === 1) {
                    gallery.innerHTML = markup;
                    Notiflix.Notify.success(
                         `Hooray! We found ${response.data.totalHits} images.`,
                         {
                              timeout: 4000,
                              useIcon: true
                         },
                    );
               }
               else {
                    gallery.insertAdjacentHTML('beforeend', markup);
               }
               isFetching = false;
               hasMore = true;
               currentPage++;
               galleryLightbox.refresh();
          }
     } catch {
          hasMore = false;
          isFetching = false;
          Notiflix.Notify.warning(
               `We're sorry, but you've reached the end of search results.`,
               {
                    timeout: 4000,
                    useIcon: true
               },
          );
     }
}

function renderData(data) {
     return data.map(item => {
          let str = `<li class="gallery-item">
               <a class="link" href="${item.largeImageURL}">
                    <img class="image"
                         src="${item.webformatURL}" 
                         alt="${item.tags}" 
                         width="${item.webformatWidth}" 
                         height="${item.webformatHeight}">
                    <ul class="image-info">
                         <li class="image-info-item">
                              <span class="image-info-title">Likes</span>
                              <span class="image-info-data">${item.likes}</span>
                         </li>
                         <li class="image-info-item">
                              <span class="image-info-title">Views</span>
                              <span class="image-info-data">${item.views}</span>
                         </li>
                         <li class="image-info-item">
                              <span class="image-info-title">Comments</span>
                              <span class="image-info-data">${item.comments}</span>
                         </li>
                         <li class="image-info-item">
                              <span class="image-info-title">Downloads</span>
                              <span class="image-info-data">${item.downloads}</span>
                         </li>
                    </ul>
               </a>
          </li>`
          return str
     }).join('');
}

window.addEventListener('scroll', _.throttle(() => {
     if (!isFetching && hasMore) {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
               fetchData(searchQuery.value, currentPage);
          }
     }
}, 300))