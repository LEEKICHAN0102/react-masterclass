import styled from "styled-components";
import { useState } from "react";
import { motion , AnimatePresence } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box=styled(motion.div)`
  width:200px;
  height:100px;
  background-color:white;
  border-radius:20px;
  box-shadow:0 2px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1);
`;

const boxVariants={
  initial:{
    opacity:0,
    scale:0
  },
  visible:{
    opacity:1,
    scale:1,
    rotateZ:360
  },
  leaving:{
    opacity:0,
    y:20
  },
}

function App() {
  const [showing,setShowing]=useState(false);
  const toggleShowing=()=>setShowing((prev)=>!prev);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>gogo</button>
      <AnimatePresence>
        {showing ? (
        <Box variants={boxVariants} initial="initial" animate="visible" exit="leaving" />
        ):null}
        </AnimatePresence>
    </Wrapper>
  );
}

export default App;