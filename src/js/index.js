import { searchInfo } from './api'

const form = document.querySelector('.search-form');

const {
     elements: { searchQuery }
} = form;


form.addEventListener('submit', (event) => {
     event.preventDefault();
     searchInfo(searchQuery.value).then((result) => console.log(result));
})

searchInfo('cat').then((result) => console.log(result));