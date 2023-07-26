import axios from "axios";
const key = '38484298-a4f98b849ca0293483b2c27a9'

const headers = new Headers({
     'Access-Control-Allow-Origin': '*',
     'Content-Type': 'application/json',
})

export const searchInfo = (info) => {
     const params = new URLSearchParams({
          key: key,
          q: info,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true
     });
     return axios.get(`https://pixabay.com/api?${params.toString()}`)
          .then(data => ({ ok: true, data }))
          .catch(error => Promise.resolve({ ok: false, error }));
}

