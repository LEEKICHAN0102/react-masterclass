import {useQuery} from "react-query";
import {getMovies} from "./API";


function Home () {
  const {data,isLoading}=useQuery(["movies","nowPlaying"],getMovies);
  console.log(data,isLoading);
  return <div style={{backgroundColor:"white", height:"200vh"}}></div>
}

export default Home;