import axios from "axios";
import Notiflix from 'notiflix';
import _ from 'lodash'
const key = '38484298-a4f98b849ca0293483b2c27a9'

export const searchInfo = (info, page) => {
     const params = new URLSearchParams({
          key: key,
          q: info,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: page
     });
     return axios.get(`https://pixabay.com/api?${params.toString()}`)
          .then((response) => {
               if (!response.data) {
                    new Error(response.status);
               }
               else {
                    return response;
               }
          }).catch(error => {
               console.log(error);
          })
}

