import { searchInfo } from './api'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let currentPage = 1;
let isFetching = false;
let hasMore = true;

const {
     elements: { searchQuery }
} = form;


form.addEventListener('submit', (event) => {
     event.preventDefault();
     currentPage = 1;
     isFetching = true;
     hasMore = true;
     searchInfo(searchQuery.value, currentPage)
          .then((response) => {
               console.log(response.data.hits);
               return renderData(response.data.hits);
          })
          .then((result) => {
               console.log(result)
               gallery.innerHTML = result;
          }).then(() => {
               let options = {
                    captionsData: 'alt',
                    captionDelay: 250,
               };

               new SimpleLightbox('.gallery a', options);
          })
          .catch((error) => {
               console.log(error);
               hasMore = false;
               isFetching = false;
          });
});

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

// searchInfo('cat', 26).catch(error => console.log(error))