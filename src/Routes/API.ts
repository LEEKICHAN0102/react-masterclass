const API_KEY="2d82507c58ff86a05c331b03053d37de"
const BASE_PATH="https://api.themoviedb.org/3";

export function getMovies(){
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response)=>response.json()
    )
}