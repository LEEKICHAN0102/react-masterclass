import { useState} from "react";
import styled from "styled-components";
import {useQuery} from "react-query";
import {motion,AnimatePresence} from "framer-motion";
import {getUpcomingMovies,IGetMoviesResult} from "../api";
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
  gap:100px;
  padding:50px 150px;
  grid-template-columns:repeat(3,1fr);
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
  position: relative;
  background-color:white;
  background-image:url(${props=>props.bgPhoto});
  background-size:cover;
  background-position:center center;
  height:400px;
  color:white;
  border-radius:20px;
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
    transition:{
      delay:0.1,
      duration:0.2,
    }
  },
}

const Info=styled(motion.div)`
  padding:5px;
  width:100%;
  position: absolute;
  bottom:0;
  h4{
    text-align:center;
    font-size:20px;
  }
`;

const infoVariants={
  hover:{
    transition:{
      delay:0.1,
      duration:0.1,
    }
  }
};

const BigMovie=styled(motion.div)`
  position:fixed;
  width:70vW;
  height:85vh;
  background-color:${props=>props.theme.black.lighter};
  top:100px;
  left: 0;
  right:0;
  margin:0 auto;
  border-radius:30px;
  overflow:hidden;
`;

const BigCover=styled.div`
  width:100%;
  height:100%;
  background-size:cover;
  background-position:center center;
  position:absolute;
`;

const BigTitle=styled.h3`
  color:${props=>props.theme.white.lighter};
  padding:20px;
  font-size:28px;
  position:relative;
  z-index:1;
  top:50%;
`;

const BigReleaseData =styled.span`
  color:${props=>props.theme.white.lighter};
  padding:20px;
  position:relative;
  z-index:1;
  top:48%;
`;

const BigOverView=styled.p`
  color:${props=>props.theme.white.lighter};
  padding:20px;
  position:relative;
  z-index:1;
  top:50%;
  width:100%;
`;

const BigMovieDetail=styled.div`
  display:flex;
  color:${props=>props.theme.white.lighter};
  padding:20px;
  position:relative;
  z-index:1;
  top:50%;
  align-items:center;
  justify-content:space-evenly;
`;

const BigMovieTrailer=styled(motion.div)`
  background-color:${props=>props.theme.white.lighter};
  position:relative;
  padding:20px;
  z-index:1;
  top:50%;
  border-radius:10px;
  color:black;
  font-size:20px;
  font-weight:500;
  cursor: pointer;
`;

const BigMovieMore=styled.div`
    background-color:${props=>props.theme.white.lighter};
  position:relative;
  padding:20px;
  z-index:1;
  top:50%;
  border-radius:10px;
  color:black;
  font-size:20px;
  font-weight:500;
  cursor: pointer;
`;


const Overlay=styled(motion.div)`
  position:fixed;
  top:0;
  bottom:100%;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  opacity:0;
`;


function Coming () {
  const {data,isLoading}=useQuery<IGetMoviesResult>(["movies","upcoming"],getUpcomingMovies);
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
  const onBoxClicked=(movieId:number)=>{
    history.push(`movies/${movieId}`);
  }
  const onOverlayClick=()=>history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  
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
              {data?.results.slice(1).map((movie)=>
              <Box 
                layoutId={String(movie.id)}
                key={movie.id} 
                onClick={()=>onBoxClicked(movie.id)}
                bgPhoto={makeImagePath(movie.backdrop_path,"original")}
                variants={boxVariants}
                whileHover="hover"
                initial="normal"
                transition={{type:"tween"}}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              )}
            </Row>
          </AnimatePresence>
        </Slider>
        <AnimatePresence>
          {bigMovieMatch?(
            <>
              <Overlay 
                onClick={onOverlayClick} 
                animate={{opacity:1}}
                exit={{opacity:0}} 
              />
              <BigMovie layoutId={bigMovieMatch.params.movieId} >
                {clickedMovie && 
                  <>
                    <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "original"
                          )})`,
                        }}
                        />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigReleaseData>{clickedMovie.release_date}</BigReleaseData>
                      <BigOverView>{clickedMovie.overview}</BigOverView>
                      <BigMovieDetail>
                        ⭐{clickedMovie.vote_average}
                        🥰{clickedMovie.vote_count}
                        <BigMovieTrailer> 🍟 Movie's Trailer!</BigMovieTrailer>
                        <BigMovieMore> 🥤 More Information</BigMovieMore>
                      </BigMovieDetail>
                  </>
                }
              </BigMovie>
            </> 
            ) :null
          }
        </AnimatePresence>
      </>
      }
    </Wrapper>
  )
}

export default Coming;