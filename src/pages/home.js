
function Home(props) {
  let template = ''
  template = `
    <h3>Filmes em cartaz essa semana</h3>
    <section class=movie></section>
    <p class="map-title">Cinemas próximos</p>
  <div style="width: 100%; height: 480px;" id="map"></div>`
  props.forEach(item => {
    fetch (movieUrl + item.id)
    .then(response => response.json())
    .then(data => {
      let movieName = data.results[0].title
      let moviePoster = data.results[0].poster_path
      
      document.querySelector('.movie').innerHTML += `<div class="poster"><a href='#${data.results[0].original_title}'><img class="poster-img" src='https://image.tmdb.org/t/p/w200${moviePoster}'><p>${movieName}</p></a></div>`
    })
  })
  return template
}




export default Home;