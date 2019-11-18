import Home from './pages/home.js';
import Movie from './pages/movie.js';


function locationHashChanged() {
  firebase.firestore().collection('movies').get().then((snap) => {
    if (location.hash==='#home' || location.hash==='') {      
      // snap.forEach(item => {
        // fetch ('https://api.themoviedb.org/3/search/movie?api_key=16ea9e0790a6d24b043d3e19ebfc181f&language=pt-BE&year=2019&query='+ item.id)
        // .then(response => response.json())
        // .then(data => {    
          document.querySelector('main').innerHTML = Home(snap);
        // })
      // })
    } else {
      document.querySelector('main').innerHTML = Movie(snap);
    }
  });
}

window.addEventListener('hashchange', locationHashChanged, false);
window.addEventListener('load', locationHashChanged, false);