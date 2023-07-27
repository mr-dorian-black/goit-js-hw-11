import axios from "axios";
const key = '38484298-a4f98b849ca0293483b2c27a9'

const headers = new Headers({
     'Access-Control-Allow-Origin': '*',
     'Content-Type': 'application/json',
})

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
               console.log(response);
               if (!response.data) {
                    new Error(response.status);
               }
               else {
                    return response;
               }
          })
}

