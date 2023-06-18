import { useState} from "react";
import styled from "styled-components";
import {useQuery} from "react-query";
import {motion,AnimatePresence} from "framer-motion";
import {getPopularMovies, IGetMoviesResult, getTrailerMovies, IGetTrailerResult} from "../api";
import { makeImagePath } from "../utils";
import {useRouteMatch, useHistory } from "react-router-dom";
import YouTube from "react-youtube";


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

const Banner=styled.div<{bgphoto:string}>`
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:60px;
  background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)), url(${(props)=>props.bgphoto});
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
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}


const Box = styled(motion.div)<{bgphoto:string}>`
  position: relative;
  background-color:white;
  background-image:url(${props=>props.bgphoto});
  background-size:cover;
  background-position:center center;
  height:400px;
  color:white;
  border-radius:20px;
  box-shadow: 0 2px 3px ${props=>props.theme.white.lighter};
  cursor:pointer;
  &:first-child{
    transform-origin:center left;
  }
  &:last-child{
    transform-origin:center right;
  }
`;

const boxVariants={
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
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
  width:70%;
  height:85%;
  background-color:${props=>props.theme.black.lighter};
  top:100px;
  left: 0;
  right:0;
  margin:0 auto;
  border-radius:30px;
  overflow:hidden;
`;

const YouTubePlayerWrapper=styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.black.lighter};
`;

const YouTubePlayer = styled(YouTube)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const YouTubeCancel=styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index:1;
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
  top:40%;
`;

const BigReleaseDate =styled.span`
  color:${props=>props.theme.white.lighter};
  padding:20px;
  position:relative;
  z-index:1;
  top:40%;
`;


const BigOverView=styled.p`
  color:${props=>props.theme.white.lighter};
  padding:20px;
  position:relative;
  z-index:1;
  top:40%;
  width:85%;
`;

const BigMovieDetails=styled.ul`
  color:${props=>props.theme.white.lighter};
  padding:20px;
  position:relative;
  z-index:1;
  top:35%;
  align-items:center;
`;

const BigMovieDetail=styled.li`
  color: ${(props) => props.theme.white.darker};
  position:relative;
  z-index:1;
  align-items:center;
  list-style-type:none;
`;

const BigMovieTrailer=styled(motion.div)`
  background-color:${props=>props.theme.white.lighter};
  text-align:center;
  margin-top:15px;
  width:100%;
  position:relative;
  padding:20px;
  z-index:1;
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
`;





function Popular() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "Popular"], getPopularMovies);
  const trailerMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const id = trailerMatch?.params.movieId;
  const { data: trailerData, isLoading: isTrailerLoading } = useQuery<IGetTrailerResult>(
    ["movies", "trailer", id],
    () => getTrailerMovies(Number(id))
  );
  
  const [openMovie, setOpenMovie] = useState(false);


  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const onBoxClicked = (movieId: number) => {
    history.push(`movies/${movieId}`);
  };
  const onOverlayClick = () => {
    history.push("/");
    setOpenMovie(false);
  }
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].poster_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  type: "tween",
                  duration: 1,
                }}
                exit="exit"
              >
                {data?.results.slice(1).map((movie) => (
                  <Box
                    layoutId={String(movie.id)}
                    key={movie.id}
                    onClick={() => onBoxClicked(movie.id)}
                    bgphoto={makeImagePath(movie.poster_path, "original")}
                    variants={boxVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                    transition={{ type: "tween" }}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                <BigMovie layoutId={bigMovieMatch.params.movieId}>
                  {openMovie ? (
                    <YouTubePlayerWrapper>
                      <YouTubeCancel onClick={()=>setOpenMovie(false)}>❌</YouTubeCancel>
                      <YouTubePlayer videoId={trailerData?.results[0].key}
                      opts={{
                        playerVars: {
                          autoplay: 1,
                        },
                      }}
                      />
                    </YouTubePlayerWrapper>
                  ) : (
                    clickedMovie && (
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
                        <BigReleaseDate>{clickedMovie.release_date}</BigReleaseDate>
                        <BigOverView>{clickedMovie.overview}</BigOverView>
                        {isTrailerLoading ? (
                          <Loader>Loading...</Loader>
                        ) : (
                          <BigMovieDetails>
                            <BigMovieDetail>Original Language: {clickedMovie.original_language}</BigMovieDetail>
                            <BigMovieDetail>Popularity: 💖 {Math.floor(clickedMovie.popularity)}</BigMovieDetail>
                            <BigMovieDetail>Vote Average: ⭐{clickedMovie.vote_average}</BigMovieDetail>
                            <BigMovieDetail>Vote Count: 🥰{clickedMovie.vote_count}</BigMovieDetail>
                            <BigMovieDetail>
                              <BigMovieTrailer onClick={() => setOpenMovie(true)}>🥤 Movie's Trailer!</BigMovieTrailer>
                            </BigMovieDetail>
                          </BigMovieDetails>
                        )}
                      </>
                    )
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Popular;