
function Home(props) {
  let template = ''
  template = `<div class=movie></div>`

  props.forEach(item => {
    fetch (movieUrl + item.id)
    .then(response => response.json())
    .then(data => {
      let movieName = data.results[0].title
      let moviePoster = data.results[0].poster_path
      document.querySelector('.movie').innerHTML += `<a href='#${data.results[0].original_title}'><img src='https://image.tmdb.org/t/p/w200${moviePoster}'><p>${movieName}</p></a>`
    })
  })
  return template
}


export default Home;