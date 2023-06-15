const API_KEY="2d82507c58ff86a05c331b03053d37de"
const BASE_PATH="https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path:string;
  poster_path:string;
  title:string;
  overview:string;
  id:number;
  genres:string[];
  release_date:string;
  vote_average:number;
  vote_count:number;
}
export interface IGetMoviesResult {
  dates:{
    maximum:string;
    minimum:string;
  };
  page:number;
  results:IMovie[],
  total_pages:number;
  total_results:number;
}

export function getPopularMovies(){
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response)=>response.json()
  )
}

export function getNowMovies(){
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response)=>response.json()
  )
}


export function getUpcomingMovies(){
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  )
}