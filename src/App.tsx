import { useEffect } from "react";
import styled from "styled-components";
import {motion,
  useMotionValue,
  useTransform,
  useScroll,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  height:200vh;
  width: 100vw;  
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:linear-gradient(135deg,rgb(238,0,153),rgb(221, 0, 238));
  
`;

const BiggerBox=styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
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
  overflow:0
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
  dragging:{backgroundColor:"rgb(46,204,113)",transition:{duration:3}},
};



function App() {
  const x=useMotionValue(0);
  const rotateZ=useTransform(x,[-800,800],[-360,360]);
  const gradient=useTransform(x,[-800,800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  return (
    <Wrapper style={{background:gradient}}>
      <Box style={{x,rotateZ,scale}} drag="x" dragSnapToOrigin/>
    </Wrapper>
  );
}

export default App;