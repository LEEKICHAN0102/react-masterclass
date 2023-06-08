import styled from "styled-components";
import {motion} from "framer-motion";

const Wrapper = styled.div`
  
  height: 100vh;
  width: 100vw;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color:rgba(255,255,255,1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle=styled(motion.div)`
  background-color:white;
  height:70px;
  width:70px;
  border-radius:35px;
  place-self:center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants={
  hover:{scale:1.5 ,rotateZ:90},
  click:{borderRadius:"100px",scale:1},
  dragging:{backgroundColor:"rgb(46,204,113)",transition:{duration:10}},
};



function App() {
  return (
    <Wrapper>
      <Box drag variants={boxVariants}
      whileHover="hover" whileDrag="dragging" whileTap="click"/>
    </Wrapper>
  );
}

export default App;