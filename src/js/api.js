import axios from "axios";
import _ from 'lodash'
const key = '38484298-a4f98b849ca0293483b2c27a9'

export const searchInfo = (info, page) => {
     return axios({
          method: 'get',
          baseURL: 'https://pixabay.com/api',
          params: {
               key: key,
               q: info,
               image_type: 'photo',
               orientation: 'horizontal',
               safesearch: true,
               per_page: 40,
               page: page
          }
     }).then((response) => {
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


