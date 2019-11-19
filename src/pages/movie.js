import Button from '../components/button.js';

function movieRender(movieData, item) {
  document.querySelector('.movie-info').innerHTML = `
  <img class="movie-image" src='https://image.tmdb.org/t/p/w200${movieData.poster_path}'>
  
  <div class="movie-data">
    <h2>${movieData.title}</h2>
    <p>Diretor(a): ${item.data().diretor}</p>
    <p>Elenco: ${item.data().elenco}</p>
    <p>Duração: ${item.data().duracao}</p>
    <p>Classificação: ${item.data().classificacao}</p>
  </div>`;
}

function Movie(props) {
  const date = new Date();
  let today = date.getDay();
  let price = [];

  const template = `
    <section class='movie-info'></section>
    <div>
      <select id="day">
      <option value="1">Segunda-feira (25/11)<option>
      <option value="2">Terça-feira (26/11)<option>
      </select>
      <button>Filtrar</button>
    </div>
    <section class='theater'></section>`;

  fetch(movieUrl + location.hash.substring(1))
    .then(response => response.json())
    .then(data => {
      let movieData = data.results[0];

      firebase.firestore()
      .collection('cinema')
      .get()
      .then((snap) => {
        snap.forEach(hora => {
          props.forEach(item => {
            if (item.id === movieData.original_title) {
              movieRender(movieData, item);
              
                for (let key in item.data()) {
                  if (key === hora.id) {
                    // console.log(item.data());
                    let horario = item.data()[key];
                    let precoNoHorario = hora.data()[today];
                    let url = hora.data().site;
                    price.push({key, horario, precoNoHorario, url});                    
                  }
                }
              }
            });
          });
          // const daysWeek = document.getElementById('day');


          // daysWeek.addEventListener('change', function (e) {
          //   console.log(e.target.value);
          // });
          console.log(price);
          
          price.sort((a, b) => (a.precoNoHorario > b.precoNoHorario ? 1 : -1));
          price.forEach(item => {
            document.querySelector('.theater').innerHTML +=
              `<div class="sale-card">
                <div>
                  <h3 class="cine">${item.key}</h3>
                  <p class="section"> ${item.horario}</p>
                </div>
                <div class="price-btn">
                  <p class="price">R$ ${item.precoNoHorario}</p>
                  <a href="${item.url}" target="_blank"><button class="sale-btn">COMPRAR</button></a>
                </div>
              </div>`;
          });
        });
    });
  return template;
}


function backToHome() {
  window.location.hash = '#home';
}

export default Movie;