import Home from './pages/home.js';
import Movie from './pages/movie.js';

function locationHashChanged() {
  firebase.firestore().collection('movies').get().then((snap) => {
    if (location.hash==='#home' || location.hash==='') {      
      document.querySelector('main').innerHTML = Home(snap);

    } else {
      document.querySelector('main').innerHTML = Movie(snap);
    }
  });
}
window.addEventListener('hashchange', locationHashChanged, false);
window.addEventListener('load', locationHashChanged, false);