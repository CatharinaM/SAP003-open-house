function movieRender(movieData, movie) { 
  document.querySelector('.movie-info').innerHTML = `
  <img class="movie-image" src='https://image.tmdb.org/t/p/w200${movieData.poster_path}'>
  <div class="movie-data">
    <h2>${movieData.title}</h2>
    <p>Diretor(a): ${movie.diretor}</p>
    <p>Elenco: ${movie.elenco}</p>
    <p>Duração: ${movie.duracao}</p>
    <p>Classificação: ${movie.classificacao}</p>
  </div>`;
}

function showPrice (price) {
  let priceTemplate = ''
  price.sort((a, b) => (a.dayPrice > b.dayPrice ? 1 : -1));
  price.forEach(item => {          
    priceTemplate +=
      `<div class="sale-card">
        <div>
          <h3 class="cine">${item.local}</h3>
          <p class="section"> ${item.time}</p>
        </div>
        <div class="price-btn">
          <p class="price">R$ ${item.dayPrice}</p>
          <a href="${item.url}" target="_blank"><button class="sale-btn">COMPRAR</button></a>
        </div>
      </div>`;
  });
  document.querySelector('.theater').innerHTML = priceTemplate
}

function fetchMovieData(props){
  const date = new Date();
  let today = date.getDay();
  let price = [];
  fetch(movieUrl + location.hash.substring(1))
  .then(response => response.json())
  .then(data => {    
    let movieData = data.results[0];    
    props.forEach(movie =>{
      
      if(movie.id === movieData.original_title){
        movieRender(movieData, movie.data())
        firebase.firestore()
        .collection('cinema')
        .get().then((snap)=>{ 
          snap.forEach(cinema => {

            for (let local in movie.data()){
              if (cinema.id === local ){    
                let time = movie.data()[local];
                let dayPrice = cinema.data()[today];
                let url = cinema.data().site;
                price.push({local, time, dayPrice, url});
              }
            }
          })
          showPrice(price);      
        })
      }
    })
  })
}

function Movie(props) {  
  const template = `
    <section class='movie-info' style="margin-top: 27px;"></section>
    <section class='theater' style="margin-top: 27px;"></section>`;

  fetchMovieData(props)

  return template;
}

export default Movie;