import Button from '../components/button.js';

function Movie(props) {
  const date = new Date()
  const today = date.getDay()
  let price = []

  let template = `
  ${Button({id: 'voltar', title: 'voltar', class: 'voltar', onClick: backToHome})}
  <section class='movie-info'></section>
    <section class='theater'></section>
  `
  fetch(movieUrl + location.hash.substring(1))
    .then(response => response.json())
    .then(data => {
      let movieData = data.results[0];
      firebase.firestore().collection('cinema').get().then((snap) => {
        snap.forEach(hora => {      
          props.forEach(item => {
            
            if (item.id === movieData.original_title){
              document.querySelector('.movie-info').innerHTML = `
              <img src='https://image.tmdb.org/t/p/w200${movieData.poster_path}'>
              
              <div class="movie-data"><h2>${movieData.title}</h2>
              <p>Diretor(a): ${item.data().diretor}</p>
              <p>Elenco: ${item.data().elenco}</p>
              <p>Duração: ${item.data().duracao}</p>
              <p>Classificação: ${item.data().classificacao}</p>

              </div>`
              for (let key in item.data()){
                if(key === hora.id){
                  let dado = item.data()[key]
                  let horario = hora.data()[today]
                  let url = hora.data().site
                  price.push({key, dado, horario, url})
                };                
              }         
            }
          })
        })
        console.log(price);
        price.sort((a, b) => (a.horario > b.horario ? 1: -1))
        price.forEach(item => {
          document.querySelector('.theater').innerHTML +=
          `<div class="sale-card">
            <div>
              <h2 class="cine">${item.key}</h2>
              <p class="section"> ${item.dado}</p>
            </div>
            <div class="price-btn">
              <p class="price">${item.horario}</p>
              <a href="${item.url}" target="_blank"><button class="sale-btn">COMPRAR</button></a>
            </div>
          </div>`
        })    
      })
    })
  return template
}

function backToHome () {
  window.location.hash = '#home'
}

export default Movie;

