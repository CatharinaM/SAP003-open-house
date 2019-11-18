import Button from '/components/button.js';


function Movie(props) {
  const date = new Date()
  const today = date.getDay()
  let price = []

  let template = `
    <section class='movie'></section>
    <section class='theater'></section>
  `
  console.log(location.hash);
  fetch (movieUrl+ location.hash.substring(1))
    .then(response => response.json())
    .then(data => {
      let movieData = data.results[0];
      firebase.firestore().collection('cinema').get().then((snap) => {
        snap.forEach(hora => {      
          document.querySelector('.movie').innerHTML = `<img src='https://image.tmdb.org/t/p/w200${movieData.poster_path}'><div><p>${movieData.title}</p><p>${movieData.overview}</p></div>`
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
        price.forEach(item => { console.log('oi')
          document.querySelector('.theater').innerHTML +=
          `<div class="sale-card">
            <div>
              <h2 class="cine">${item[0]}</h2>
              <p class="section"> ${item[1]}</p>
            </div>
            <div class="price-btn">
              <p class="price">${item[2]}</p>
              <a href="${item[3]}" target="_blank"><button class="sale-btn">COMPRAR</button></a>
            </div>
          </div>`
        })    
      })
    })
    return template 
}

function click() {
  
}

export default Movie;

