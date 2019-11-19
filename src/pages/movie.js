function Movie(props) {
  const date = new Date()
  const today = date.getDay()
  let price = []

  let template = `
  <section class='movie-info'></section>
    <section class='theater'></section>
  `
  fetch(movieUrl + location.hash.substring(1))
    .then(response => response.json())
    .then(data => { console.log(data);
      let movieData = data.results[0];
      firebase.firestore().collection('cinema').get().then((snap) => {
        snap.forEach(hora => {      
          document.querySelector('.movie-info').innerHTML = `
          <img class="movie-img" src='https://image.tmdb.org/t/p/w200${movieData.poster_path}'>
          <div class="movie-data"><h2>${movieData.title}</h2><p>${movieData.overview}</p></div>`
          props.forEach(item => {
            if (item.id === movieData.original_title){
              for (let key in item.data()){
                if(key === hora.id){
                  let dado = item.data()[key]
                  let horario = hora.data()[today]
                  let url = hora.data().site
                  price.push([key, dado, horario, url])
                };                
              }         
            }
          })
        })
        price.sort((a, b) => (a[2] > b[2]?1:-1))
        price.forEach(item => {
          document.querySelector('.theater').innerHTML +=
          `<div class="sale-card">
            <div>
              <h2 class="cine">${item[0]}</h2>
              <p class="section"> ${item[1]}</p>
            </div>
            <div class="price-btn">
              <p class="price">R$ ${item[2]}</p>
              <a href="${item[3]}" target="_blank"><button class="sale-btn">COMPRAR</button></a>
            </div>
          </div>`
        })    
      })
    })
  return template
}

export default Movie;

