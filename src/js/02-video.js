import Player from '@vimeo/player';
import _ from "lodash";


const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', _.throttle(() => {
     player.getCurrentTime().then((seconds) => {
          localStorage.setItem("videoplayer-current-time", seconds);
     }).catch((error) => console.log(error));
}, 1000));

let videoCurrentTime = localStorage.getItem("videoplayer-current-time");
videoCurrentTime ? player.setCurrentTime(videoCurrentTime) : '';