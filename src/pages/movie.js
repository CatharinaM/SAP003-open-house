
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
            if (item.id === movieData.title){
              for (let key in item.data()){
                if(key === hora.id){
                  let dado = item.data()[key]
                  let horario = hora.data()[today]
                  price.push([key, dado, horario])
                };                
              }         
            }
          })
        })
        price.forEach(item => {
          document.querySelector('.theater').innerHTML +=`<div><h2>${item[0]}</h2><p> ${item[1]}</p></div><div><p>${item[2]}</p><p>Botão Comprar</p></div>`
        })    
      })
    })
    return template 
}



export default Movie;

