// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

const gallery = document.querySelector('.gallery');

const images = galleryItems.map(item => {
     let liItem = document.createElement('li');
     liItem.classList.add('gallery__item');

     let aItem = document.createElement('a');
     aItem.classList.add('gallery__link');
     aItem.href = item.original;

     let imgItem = document.createElement('img');
     imgItem.classList.add('gallery__image');
     imgItem.src = item.preview;
     imgItem.alt = item.description;

     aItem.append(imgItem);
     liItem.append(aItem);
     return liItem
});

gallery.append(...images);

let options = {
     captionsData: 'alt',
     captionDelay: 250,
};

new SimpleLightbox('.gallery a', options);
