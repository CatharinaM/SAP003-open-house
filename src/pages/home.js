
function Home(props) {
  let template = ''
  template = `<div class=movie></div>`

  props.forEach(item => {
    fetch ('https://api.themoviedb.org/3/search/movie?api_key=16ea9e0790a6d24b043d3e19ebfc181f&language=pt-BR&year=2019&query='+ item.id)
    .then(response => response.json())
    .then(data => {
      let movieName = data.results[0].title
      
      console.log(data.results[0].original_title);
      let moviePoster = data.results[0].poster_path
      
      document.querySelector('.movie').innerHTML += `<a href='#${data.results[0].original_title}'><img src='https://image.tmdb.org/t/p/w200${moviePoster}'><p>${movieName}</p></a>`
    })
  })
  return template
}


export default Home;