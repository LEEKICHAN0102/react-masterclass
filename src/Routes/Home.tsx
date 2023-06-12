import {useState} from "react";
import styled from "styled-components";
import {useQuery} from "react-query";
import {motion,AnimatePresence} from "framer-motion";
import {getMovies,IGetMoviesResult} from "../api";
import { makeImagePath } from "../utils";
import {useRouteMatch, useHistory } from "react-router-dom";

const Wrapper=styled.div`
  background-color:black;
`;

const Loader=styled.div`
  height:20vh;
  text-align:center;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Banner=styled.div<{bgPhoto:string}>`
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:60px;
  background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)), url(${(props)=>props.bgPhoto});
  background-size:cover;
`;

const Title=styled.h2`
  font-size:68px;
  margin-bottom:20px;
`;

const OverView=styled.p`
  font-size:20px;
  width:70%;
`;

const Slider=styled.div`
  position:relative;
  top:-100px;
`;

const Row=styled(motion.div)`
  display:grid;
  gap:5px;
  grid-template-columns:repeat(6,1fr);
  position:absolute;
  width:100%;
`;

const rowVariants={
  hidden:{
    x:window.outerWidth+5,
  },
  visible:{
    x:0,
  },
  exit:{
    x:-window.outerWidth-5
  },
}


const offset=6;

const Box = styled(motion.div)<{bgPhoto:string}>`
  background-color:white;
  background-image:url(${props=>props.bgPhoto});
  background-size:cover;
  background-position:center center;
  height:150px;
  color:white;
  cursor:pointer;
  &:first-child{
    transform-origin:center left;
  }
  &:last-child{
    transform-origin:center right;
  }
`;

const boxVariants={
  normal:{
    scale:1,
  },
  hover:{
    y:-50,
    scale:1.3,
    transition:{
      delay:0.5,
      duration:0.2,
      type:"tween"
    }
  },
}

const Info=styled(motion.div)`
  padding:5px;
  background-color:${props=>props.theme.black.lighter};
  opacity:0;
  position:absolute;
  width:100%;
  bottom:0;
  h4{
    text-align:center;
    font-size:12px;
  }
`;

const infoVariants={
  hover:{
    opacity:1,
    transition:{
      delay:0.5,
      duration:0.2,
      type:"tween"
    }
  }
};



function Home () {
  const {data,isLoading}=useQuery<IGetMoviesResult>(["movies","nowPlaying"],getMovies);
  const [index,setIndex]=useState(0);
  const increaseIndex=()=>{
    if(data){
      if(leaving) return
    toggleLeaving();
    const totalMovies=data.results.length-1;
    const maxIndex=Math.floor(totalMovies/offset)-1;
    console.log(maxIndex);
    setIndex((prev)=>prev === maxIndex?0:prev+1);
    }
  }
  const [leaving,setLeaving]=useState(false);
  const toggleLeaving=()=>setLeaving(prev=>!prev);
  const history=useHistory();
  const bigMovieMatch=useRouteMatch<{movieId:string}>("/movies/:movieId");
  console.log(bigMovieMatch);
  const onBoxClicked=(movieId:number)=>{
    history.push(`movies/${movieId}`);

  }

  return (
    <Wrapper>
      {isLoading?<Loader>Loading...</Loader>:
      <>
        <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path||"")}>
          <Title>{data?.results[0].title}</Title>
          <OverView>{data?.results[0].overview}</OverView>
        </Banner>
        <Slider>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row 
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              transition={{
                type:"tween",
                duration:1
              }}
              exit="exit"
              key={index}>
              {data?.results.slice(1)
              .slice(offset*index,offset*index+offset)
              .map((movie)=>
              <Box 
                layoutId={String(movie.id)}
                key={movie.id} 
                onClick={()=>onBoxClicked(movie.id)}
                bgPhoto={makeImagePath(movie.backdrop_path,"w500")}
                variants={boxVariants}
                whileHover="hover"
                initial="normal"
                transition={{type:"tween"}}
                ><Info 
                  variants={infoVariants}
                  >
                  <h4>{movie.title}</h4>
                  </Info>
                </Box>
              )}
            </Row>
          </AnimatePresence>
        </Slider>
        <AnimatePresence>
          {bigMovieMatch?
            <motion.div layoutId={bigMovieMatch.params.movieId} style={{position:"absolute",width:"40vW",height:"80vh",backgroundColor:"red",
            top:200,
            left: 200,
            margin:"0 auto"
          }}/>:null
          }
        </AnimatePresence>
      </>}
    </Wrapper>
  )
}

export default Home;