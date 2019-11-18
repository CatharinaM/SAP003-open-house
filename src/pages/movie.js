
function Movie(props) {
  let price = []
  let template = `
    <div class='movie'></div>
    <div class='theater'></div>
  `
  console.log(location.hash);
  fetch (movieUrl+ location.hash.substring(1))
    .then(response => response.json())
    .then(data => {
      let movieData = data.results[0];
      firebase.firestore().collection('cinema').get().then((snap) => {
        snap.forEach(hora => {
          // console.log(hora.id, hora.data());
          

          document.querySelector('.movie').innerHTML = `<img src='https://image.tmdb.org/t/p/w200${movieData.poster_path}'><div><p>${movieData.title}</p><p>${movieData.overview}</p></div>`
          props.forEach(item => {
            if (item.id === movieData.title){
              for (let key in item.data()){
                if(key === hora.id){
                  console.log('sim');
                  
                };
                
              }         
            }
          })
        })
        
      })
      
      // document.querySelector('.theater').innerHTML +=` <h2>${key}</h2><p> ${item.data()[key]}</p>`
      
      
    })
    return template 
}



export default Movie;

